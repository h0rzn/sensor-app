<template>
    <Hardware typ={{ name }}/>
</template>

<script>
import Hardware from './HardwareItem.vue';
export default {
    components: {
        Hardware
    },
    props: {
        name: String
    }
}
</script>

<style>
</style>