<template>
    <span class="loader" v-bind:style="{ width: computedDim, height: computedDim }"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    dim: String
})

const computedDim = computed(() => props.dim);
</script>

<style>
.loader {
  position: relative;
}

.loader:before , .loader:after{
  content: '';
  border-radius: 50%;
  position: absolute;
  inset: 0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3) inset;
}
.loader:after {
  box-shadow: 0 2px 0 rgba(22, 242, 213, 1) inset;
  /* box-shadow: 0 2px 0 rgba(255, 255, 255, 0.7) inset; */
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {  transform: rotate(0)}
  100% { transform: rotate(360deg)}
}
</style>