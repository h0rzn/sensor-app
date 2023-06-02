import { Store } from "pinia";
import { useSensors, Set } from "./store/Sensors";

export interface Streamer {
    streamerType: string;
    start(resource: string): Promise<void>
    stop(): void;
}

enum MessageType {
    SensorSet = "sensors",
    Error = "error",
}

type WSMessage = {
    msgType: string;
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

    start(resource: string): Promise<void> {
        console.log("ws streamer: start", resource)
        return new Promise((resolve, reject) => {
            const con: WebSocket = new WebSocket(resource);

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
        const set: WSMessage = JSON.parse(raw.data);

        if (set) {
            console.log(set);
            this.store.update(set);
        } else {
            console.log("set undefined");
        }
    }
    
    stop() {
        this.ws?.close();
    }
}