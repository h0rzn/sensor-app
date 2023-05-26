<template>
    <div class="item">
        <div class="item-head">
            <p class="hardware-type">cpu</p>
            <div class="load-section">
                <p class="load-value">{{ this.computedLoaderWidth }}</p>
                <LoadIndicator :update-interval="24" :fetch-func="loadRaw" :min-value="0" :max-value="100" />
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

const loaderColorLow = "#D9D9D9";
const loaderColorMid = "#16F289";
const loaderColorHigh = "#D86C6C";

export default {
    data() {
        return {
            collectDataTimer: undefined,
            loaderValue: 0,
            loaderWidth: "0%",
            loaderColor: loaderColorLow
        };
    },
    computed: {
        computedLoader() {
            return this.loaderValue;
        },
        computedLoaderWidth() {
            return this.loaderWidth;
        },
        computedLoaderColor() {
            return this.loaderColor;
        }
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    mounted() {
        this.collectDataTimer = setInterval(this.collectData, 1000);
    },
    methods: {
        collectData() {
            let loaderValue = this.store.getLatestCpuLoad;
            this.loaderWidth = loaderValue + "%";
            if (loaderValue < 20) {
                this.loaderColor = loaderColorLow;
            }
            else if (loaderValue < 80) {
                this.loaderColor = loaderColorMid;
            }
            else {
                this.loaderColor = loaderColorHigh;
            }
        },
        loadRaw() {
            return this.store.getLatestCpuLoad;
        },
    },
    components: { LoadIndicator, SensorBox }
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