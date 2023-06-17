import { Store } from "pinia";
import { useSensors, Set } from "./store/Sensors";
import {  MessageTypes } from "./types";

export interface Streamer {
    streamerType: string;
    start(): Promise<void>
    stop(): void;
}

type WSMessage = {
    type: string;
    data: Set[];
}

export class WebSocketStreamer implements Streamer {
    streamerType: string = "ws";
    url: string;
    ws?: WebSocket;
    store: Store<string, any>;

    constructor(url: string) {
        this.url = url;
        this.store = useSensors();
    }

    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            const con: WebSocket = new WebSocket(this.url);

            // onopen handler
            con.onopen = () => {
                // onclose handler
                con.onclose = () => console.log("ws closed");

                // onmessage handler
                con.onmessage = (msg: MessageEvent) => {
                    this.handleMessage(msg);
                    // this.store.set(obj);
                };
                this.ws = con;
                resolve();
            }

            // onerror handler
            con.onerror = () => {
                console.log("ws: on error")
                reject();
            }

        });
    }

    handleMessage(raw: MessageEvent) {
        const msg: WSMessage = JSON.parse(raw.data);
        console.log(msg.type, msg);
        if (msg) {
            switch (msg.type) {
                case MessageTypes.Sensors:
                    console.log("handling", msg.type);
                    this.store.update(msg.data);
                    break;
                case MessageTypes.Error:
                    break;
                default:
                    break;
            }
        }
    }
    
    stop() {
        this.ws?.close();
    }
}