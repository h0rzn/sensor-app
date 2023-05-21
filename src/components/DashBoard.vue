<template>
    <div class="dashboard">
        <div class="header">
        </div>

        <div class="content">
            <div v-if="loading" class="content-centered">
                <ErrorScreen v-if="conFailure"/>
                <LoadingSpinner v-else/>
            </div>

            <div v-else class="content-sensors">
                <HardwareItem typ="CPU" name="i7 13700k"/>
                <HardwareItem typ="GPU" name="2070 super"/>
            </div>

        </div>
        

    </div>
</template>

<script>
import HardwareItem from './HardwareItem.vue';
import { useSensorsStore } from '../store/Sensors.js';
import LoadingSpinner from './LoadingSpinner.vue';
import ErrorScreen from './ErrorScreen.vue';

export default {
    components: {
        HardwareItem,
        LoadingSpinner,
        ErrorScreen
    },
    data() {
        return {
            ws: undefined,
            loading: true,
            conFailure: false,
        }
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    async mounted() {
        console.log("created, ws")

        await this.connect().then(() => {}).catch((err) => {
            this.conFailure = true;
            console.log("async connect: ERROR", err);
        })
    },
    unmounted() {
        // this.ws.close()
    },
    methods: {
        connect() {
            return new Promise((resolve, reject) => {
                console.log("attempt connect")
                var con = new WebSocket("ws://localhost:8000");

                con.addEventListener("open", () => {
                    console.log("open event");
                    // clearTimeout(conTimeout);
                    resolve();
                });
                con.addEventListener("close", () => {
                    console.log("ws: closed")
                })
                con.addEventListener("message", (msg) => {
                    const obj = JSON.parse(msg.data);
                    this.store.set(obj);

                    if (this.loading) {
                        this.loading = false;
                    }
                });
                con.addEventListener("error", (err) => {
                    reject(err);
                })

                this.ws = con;
            });
        },
    }
    
}
</script>

<style>
.dashboard {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.header {
    width: 100%;
    height: 50px;
    /* background-color: #e8e8e8; */
}
/* .content {
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
} */


.content {
    flex-grow: 1;
}
.content-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    /* background-color: red; */
}
.content-sensors {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

</style>