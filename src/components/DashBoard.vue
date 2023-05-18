<template>
    <div class="dashboard">
        <div class="header">
        </div>

        <div class="content">
            <div v-if="loading" class="content-centered">
                <LoadingSpinner/>
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

export default {
    components: {
        HardwareItem,
        LoadingSpinner
    },
    data() {
        return {
            ws: undefined,
            loading: true,
        }
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    mounted() {
        console.log("created, ws")
        
        // testing
        // this.loading = false;

        // window.addEventListener("beforeunload", () => {
        //     console.log("hallo");
        //     this.ws.close();
        // })


        this.ws = new WebSocket("ws://localhost:8000")

        this.ws.addEventListener("open", () => {
            console.log("ws: connected");
        });
        this.ws.addEventListener("close", () => {
            console.log("ws: closed")
        })
        this.ws.addEventListener("message", (msg) => {
            const obj = JSON.parse(msg.data);
            this.store.set(obj);

            if (this.loading) {
                this.loading = false;
            }
        });
        this.ws.addEventListener("error", (err) => {
            console.log("ws err:", err);
        })
    },
    unmounted() {
        // this.ws.close()
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