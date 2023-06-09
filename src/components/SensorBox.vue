<template>
    <div class="box" v-if="displayValue != ''">
        <div class="box-section" id="value-section">
            <p class="title">{{ sensorType }}</p>
            <p class="value" >{{ computedDisplayValue }}</p>
        </div>
       <div class="box-section" id="load-section">
            <LineIndicator :type="componentType" :sensorType="sensorType" :min="0" :max="100" />
            <!-- <LineIndicator :type="componentType" :min="0" :max="100" /> -->
        </div>
    </div>

    <div class="box" id="loading-box" v-else>
        <LoadingCircle :dim="'28px'" />
    </div>
</template>

<script lang="ts">
import { useSensors } from '@/store/Sensors';
import LoadingCircle from './LoadingCircle.vue';
import LineIndicator from './LineIndicator.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { 
        LoadingCircle,
        LineIndicator
    },
    props: {
        sensorType: { type: String, required: true},
        componentType: { type: String, required: true}
    },
    data() : {
        displayValue: string,
        rawValue: number,
        updateTimer?: number
    } {
        return {
            displayValue: "",
            rawValue: 0,
        }
    },
    computed: {
        computedDisplayValue() {
            return this.displayValue;
        }
    },
    setup() {
        const store = useSensors();
        return { store };
    },
    mounted() {
        this.updateTimer = window.setInterval(this.getHardwareData, 1000);
    },
    methods: {
        getHardwareData() {
            if (this.sensorType == "temperature") {
                this.store.getByType
                let temp = this.store.getByType(this.componentType)?.temperature;
                if (temp) {
                    this.rawValue = temp;
                    this.displayValue = temp + "°";
                }
            } else if (this.sensorType == "power") {
                let power = this.store.getByType(this.componentType)?.power;
                if (power) {
                    this.rawValue = power;
                    this.displayValue = power + "w";
                }
            }
        },

        getValue() : number {
            return this.rawValue;
        },
    }
});

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