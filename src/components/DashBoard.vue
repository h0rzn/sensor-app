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
import { useSensors } from "../store/Sensors";
import ErrorScreen from './ErrorScreen.vue';
import ComponentItem from './ComponentItem.vue';
import LoadingCircle from './LoadingCircle.vue';
import { defineComponent } from 'vue';

import DaemonHandler from '../DaemonHandler';

export default defineComponent({
    components: {
        ErrorScreen,
        ComponentItem,
        LoadingCircle
    },
    data() : {
        ws?: WebSocket,
        loading: boolean,
        conFailure: boolean,
        dh?: DaemonHandler
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
        this.dh = new DaemonHandler("ws://localhost:8000", "python-test-server")
        this.dh.run().then(() => {
            this.loading = false;
            console.log("connected");
        }).catch(() => {
            console.log("connection failed");
            this.conFailure = true;
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