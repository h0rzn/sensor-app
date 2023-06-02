import { Streamer, WebSocketStreamer } from "./Streamer";

export default class DaemonHandler {
    url: string;
    name: string;
    ws?: WebSocket;
    streamer: Streamer;

    constructor(url: string, name: string) {
        this.url = url;
        this.name = name;
        this.streamer = new WebSocketStreamer(this.url);
    }

    run(): Promise<void> {
        console.log("daemon h: running", this.streamer);
        return this.streamer.start(this.url);
    }

}