<template>
    <div>
        <p>{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

export interface Props {
    message?: string
}
withDefaults(defineProps<Props>(), {
    message: "An unkown error ocurred"
});
</script>

<style>
p {
    font-size: 16px;
    font-weight: bold;
    color: #C1C1C1;
}
</style>