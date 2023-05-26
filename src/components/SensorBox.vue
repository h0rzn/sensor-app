<template>
    <div class="box" v-if="displayValue != ''">
        <div class="box-section" id="value-section">
            <p class="title">{{ sensorType }}</p>
            <p class="value" >{{ computedDisplayValue }}</p>
        </div>
       <div class="box-section" id="load-section">
            <LoadIndicator :update-interval="100" :fetch-func="getValue" />
       </div>
    </div>

    <div class="box" id="loading-box" v-else>
        <LoadingSpinner :dim="'24px'"/>     
    </div>
</template>

<script>
import LoadIndicator from './LoadIndicator.vue';
import { useSensorsStore } from '../store/Sensors';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
    props: {
        sensorType: String,
    },
    data() {
        return {
            displayValue: "",
            updateTimer: undefined
        }
    },
    computed: {
        computedDisplayValue() {
            return this.displayValue;
        }
    },
    components: { LoadIndicator, LoadingSpinner },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    mounted() {
        this.updateTimer = setInterval(this.getHardwareData, 1000);
    },
    methods: {
        getHardwareData() {
            // this.raw = this.store.getByHardwareType;

            
            if (this.sensorType == "temperature") {
                let temp = this.store.getTemperature;
                this.displayValue = temp + "°";
            } else if (this.sensorType == "power") {
                let power = this.store.getPower;
                this.displayValue = power + "°";
            }

        },

        getValue() {
            return this.displayValue;
        },

        hasData() {
            console.log("hasdata");
            return this.displayValue !== "";
        }

    }
}

</script>

<style scoped>
.box {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: #1F1D21;
    /* background-color: red; */
}

#loading-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner {
    width: 12;
    height: 12;
}

#value-section {
    height: 70%;
    padding: 0% 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#load-section {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0% 5%;
}

.title {
    font-size: 12px;
    font-weight: 600;
    color: #818181;
    text-transform: uppercase;
}

.value {
    font-size: 24px;
}

p {
    margin: 0;
}

</style>