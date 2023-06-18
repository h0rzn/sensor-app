import { Store } from "pinia";
import { useSensors, Set } from "./store/Sensors";
import {  MessageTypes } from "./types";

export interface Streamer {
    streamerType: string;
    start(): Promise<void>;
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
    // onClose Callback
    onClose: Function;

    constructor(url: string, onClose: Function) {
        this.url = url;
        this.onClose = onClose;
        this.store = useSensors();
    }

    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            const con: WebSocket = new WebSocket(this.url);

            // onopen handler
            con.onopen = () => {
                // onclose handler
                con.onclose = () => {
                    console.log("ws closed");
                    this.onClose();
                }

                // onmessage handler
                con.onmessage = (msg: MessageEvent) => {
                    this.handleMessage(msg);
                };
                this.ws = con;
                resolve();
            }

            // onerror handler
            con.onerror = () => {
                console.log("ws: on error")
                con.close();
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