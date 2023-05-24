<template>
    <div class="hw-item">
        <div class="hw-sensor-head">
            <h1 class="hw-type">{{ typ }}</h1>
            <p class="hw-name">{{ store.getCpu.name }}</p>
        </div>
        
        <div class="hw-sensor-box" id="hw-load">
            <div class="hw-text">
                <p class="hw-sensor-value">{{ store.getCpu.load.value + "%" }}</p>
                <p class="hw-sensor-type">Load</p>
            </div>
            <div class="hw-chart-container">
                <BarChart class="chart" />
            </div>
        </div>

        <div class="hw-sensor-box" id="hw-temp">
            <div class="hw-text">
                <p class="hw-sensor-value">{{ store.getCpu.temperature.value + "°" }}</p>
                <p class="hw-sensor-type">Load</p>
            </div>
            <div class="hw-chart-container">
                <BarChart class="chart" />
            </div>
        </div>

        <div class="hw-sensor-box" id="hw-power">
            <div class="hw-text">
                <p class="hw-sensor-value">{{ store.getCpu.power.value + "w" }}</p>
                <p class="hw-sensor-type">Load</p>
            </div>
            <div class="hw-chart-container">
                <BarChart class="chart" />
            </div>
        </div>

    </div>
</template>

<script>
import { useSensorsStore } from '../store/Sensors.js';
import BarChart from './BarChart.vue';

export default {
    props: {
        typ: String,
        name: String
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    components: { BarChart }
}
</script>

<style>
@import '../assets/styles/colors.css';

@media screen and (max-width: 480px) {
    .hw-item {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--dark);
    }

    .hw-sensor-head {
        text-align: left;
    }
    .hw-type {
        font-size: 20px;
        text-align: center;
        margin: 0;
    }
    .hw-name {
        font-size: 12px;
        margin: 0;
    }
    .hw-text {
        font-size: 16px;
    }

    .hw-sensor-box {
        width: 90%;
        text-align: left;
        padding: 3px;
        border-radius: 20px;
        /* background-color: #f2d5cf; */

        display: flex;
        flex-direction: columns;

    }
    .hw-sensor-value {
        font-size: 22px;
        font-weight: bold;
        margin: 0;
        color: #303446;
    }
    .hw-sensor-type {
        font-size: 16px;
        font-weight: lighter;
        margin: 0;
        color: #303446;
    }


    .hw-text {
        flex-grow: 1;

    }

    .hw-chart-container {
        /* flex-grow: 1; */
        width: 140px;
    }

    /* .chart {

    } */

}

</style>