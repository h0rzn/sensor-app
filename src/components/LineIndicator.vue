<template>
    <div class="load-indicator-wrapper">
        <div id="loader" class="load-indicator" ref="line" />

    </div>
</template>

<script setup lang="ts">
import { useSensors } from '@/store/Sensors';
import { storeToRefs } from 'pinia';
import { defineProps, watch, ref } from 'vue';

const sensorStore = useSensors();
const { latest } = storeToRefs(sensorStore);

const props = defineProps<{
    min: number,
    max: number,
    type: string,
    sensorType: string,
}>()

const line = ref<HTMLDivElement>()

const boundWidth = ref<String>("0%")

function translate(val: number): number {
    return 100 / props.max * val
}

watch(latest, () => {
    let val: number | undefined = sensorStore.getSensor(props.type, props.sensorType);
    boundWidth.value = (val ? translate(val) : 0) + "%"
});

</script>


<style>
.load-indicator-wrapper {
    width: 100%;
    background-color: #6A6A6A;
}

.load-indicator {
    height: 4px;
    background: rgb(22,242,137);
    background: linear-gradient(90deg, rgba(22,242,137,1) 0%, rgba(22, 242, 213, 1) 100%);
    border-radius: 10px;
    transition: width 0.8s ease-out;
    width: v-bind(boundWidth);
}
</style>