<template>
    <div class="dashboard">

        <div class="content">
            <div v-if="loading" class="content-items">
                <ErrorScreen v-if="conFailure"/>
                <LoadingSpinner :dim="'48px'" v-else/>
            </div>

            <div v-else class="content-items">
                <ComponentItem />
                <ComponentItem />
            </div>

        </div>
        

    </div>
</template>

<script>
import { useSensorsStore } from '../store/Sensors.js';
import LoadingSpinner from './LoadingSpinner.vue';
import ErrorScreen from './ErrorScreen.vue';
import ComponentItem from './ComponentItem.vue';

export default {
    components: {
    LoadingSpinner,
    ErrorScreen,
    ComponentItem
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