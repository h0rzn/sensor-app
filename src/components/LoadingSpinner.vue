<template>
    <svg id="spinner" v-bind:style="{ width: computedDim, height: 'auto'}" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g class="spinner_V8m1"><circle class="circle" cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g>
    </svg>
        
</template>

<script lang="ts">
import { computed } from 'vue';


export interface Props {
    dim?: string
}

const props = withDefaults(defineProps<Props>(), {
    dim: "24"
})

const computedDim = computed(() => props.dim);

export default {
    props: {
        dim: String
    },
    computed: {
        computedDim() {
            return this.dim
        }
    }
}
</script>

<style>
.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}
.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}
@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}
@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}

.circle {
    stroke: #818181;
}
</style>

