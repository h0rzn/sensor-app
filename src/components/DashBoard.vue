<template>
    <div class="dashboard">

        <div class="content">
            <div v-if="loading" class="content-items">
                <ErrorScreen :message="'websocket connection error'" v-if="conFailure"/>
                <LoadingCircle :dim="'48px'" v-else />
            </div>

            <div v-else class="content-items">
                <ComponentItem :type="comp(0)" />
                <ComponentItem :type="comp(1)" />
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
import { Components } from '../types';

import { Streamer, WebSocketStreamer } from "@/Streamer";

export default defineComponent({
    components: {
        ErrorScreen,
        ComponentItem,
        LoadingCircle
    },
    data() : {
        loading: boolean,
        conFailure: boolean,
        streamer?: Streamer,
    } {
        return {
            loading: true,
            conFailure: false,
        }
    },
    setup() {
        const store = useSensors();
        return { store };
    },
    async mounted() {
        this.streamer = new WebSocketStreamer("ws://localhost:8000");
        this.streamer.start().then(() => {
            this.loading = false;
            console.log("connected");
        }).catch(() => {
            console.log("connection failed");
            this.conFailure = true;
        })
    },
    methods: {
        comp(n: number): Components {
            if (n == 0) {
                return Components.CPU;
            } else {
                return Components.GPU;
            }
        }
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