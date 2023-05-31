<template>
    <div class="dashboard">

        <div class="content">
            <div v-if="loading" class="content-items">
                <ErrorScreen :message="'websocket connection error'" v-if="conFailure"/>
                <LoadingCircle :dim="'48px'" v-else />
            </div>

            <div v-else class="content-items">
                <ComponentItem />
                <ComponentItem />
            </div>
        </div> 

    </div>
</template>

<script lang="ts">
import { useSensorsStore } from '../store/Sensors.js';
import ErrorScreen from './ErrorScreen.vue';
import ComponentItem from './ComponentItem.vue';
import LoadingCircle from './LoadingCircle.vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components: {
        ErrorScreen,
        ComponentItem,
        LoadingCircle
    },
    data() : {
        ws?: WebSocket,
        loading: boolean,
        conFailure: boolean
    } {
        return {
            loading: true,
            conFailure: false,
        }
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    async mounted() {
        await this.connect().then((ws: WebSocket) => {
            this.loading = false;
            this.ws = ws;
            console.log("connected", ws)
        }).catch(() => {
            console.log("connection failed");
            this.conFailure = true;
        });
    },
    methods: {
        connect() : Promise<WebSocket> {
            return new Promise((resolve, reject) => {
                console.log("attempt connect")
                // const ipAddr = "192.168.178.121";
                const ipAddr = "localhost";
                var con = new WebSocket("ws://" + ipAddr + ":8000");

                con.onopen = () => {
                    // register handlers
                    con.onclose = () => console.log("ws closed");

                    con.onmessage = (msg: MessageEvent) => {
                        const obj = JSON.parse(msg.data);
                        this.store.set(obj);
                    };

                    con.onerror = () => {
                        console.log("ws error");
                    };

                    resolve(con);
                };

                con.onerror = () => {
                    reject();
                } 
            });
            
        },    
    }
})
</script>

<style>
.dashboard {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.content {
    width: 100%;
    height: 100%;
}
.content-items {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #27272B;
}

</style>