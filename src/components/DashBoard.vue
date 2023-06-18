<template>
    <div class="dashboard">

        <div class="content">
            <div v-if="state == -1" class="content-items">
                <ErrorScreen :message="'websocket connection error'"/>
            </div>

            <div v-if="state == 0" class="content-items">
                <LoadingCircle :dim="'48px'"/>
            </div>

        
            <div v-if="state == 1" class="content-items">
                <ComponentItem :type="'cpu'" />
                <ComponentItem :type="'gpu'" />
            </div>
        </div> 

    </div>
</template>

<script lang="ts">
import { useSensors } from "../store/Sensors";
import ErrorScreen from './ErrorScreen.vue';
import ComponentItem from './ComponentItem.vue';
import LoadingCircle from './LoadingCircle.vue';
import { defineComponent } from 'vue';

import { Streamer, WebSocketStreamer } from "@/Streamer";

export default defineComponent({
    components: {
        ErrorScreen,
        ComponentItem,
        LoadingCircle
    },
    data() : {
        state: Number,
        streamer?: Streamer,
    } {
        return {
            state: 0,
        }
    },
    setup() {
        const store = useSensors();
        return { store };
    },
    async mounted() {
        this.streamer = new WebSocketStreamer("ws://localhost:8000", () => {
            // onClose
            this.state = -1;
        });
        this.streamer.start().then(() => {
            console.log("connected");
            this.state = 1;
        }).catch(() => {
            console.log("connection failed");
            this.state = -1;
        })
    },
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