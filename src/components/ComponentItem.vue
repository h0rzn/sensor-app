<template>
    <div class="item">
        <div class="item-head">
            <p class="hardware-type">cpu</p>
            <div class="load-section">
                <p class="load-value">{{ this.computedLoaderText }}</p>
                <LoadIndicator :update-interval="1000" :fetch-func="loadRaw" :min-value="0" :max-value="100" />
            </div>
        </div>

        <SensorBox sensor-type="power" />

        <SensorBox sensor-type="temperature" />
    </div>

</template>

<script>
import { useSensorsStore } from '../store/Sensors.js';
import LoadIndicator from './LoadIndicator.vue';
import SensorBox from './SensorBox.vue';

export default {
    components: { LoadIndicator, SensorBox },
    data() {
        return {
            fetchTimer: undefined,
            loaderText: "0%",
        };
    },
    computed: {
        computedLoaderText() {
            return this.loaderText;
        },
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    mounted() {
        this.fetchTimer = setInterval(this.fetchData, 1000);
    },
    methods: {
        loadRaw() {
            return this.store.getLatestCpuLoad;
        },
        fetchData() {
            let loaderValue = this.loadRaw();
            this.loaderText = loaderValue + "%";
        },
    },
}
</script>

<style scoped>
.item {
    height: 100%;
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.hardware-type {
    font-size: 12px;
    font-weight: 600;
    color: #818181;
    text-transform: uppercase;
    margin: 0;
}

.load-value {
    font-size: 28px;
    font-weight: bold;
    color: #C1C1C1;
    margin-top: 0;
    margin-bottom: 15px;
}

.load-indicator-wrapper {
    width: 100%;
    /* height: 3px; */
    background-color: #6A6A6A;
}

.load-indicator {
    height: 3px;
    /* background-color: #16F289; */
    background: rgb(22,242,137);
    background: linear-gradient(90deg, rgba(22,242,137,1) 0%, rgba(22,242,212,1) 100%);
    border-radius: 10px;
    transition: width 0.8s ease-out;
}

.sensor-box {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: #1F1D21;
}

.sensor-box-title {
    font-size: 12px;
    font-weight: 600;
    color: #818181;
    text-transform: uppercase;
    padding: 5px;
}

</style>