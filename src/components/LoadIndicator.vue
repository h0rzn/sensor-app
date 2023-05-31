<template>
    <div class="load-indicator-wrapper">
        <div id="loader" class="load-indicator" v-bind:style="computedLoaderWidth" />

    </div>
</template>

<script lang="ts">
import { defineComponent, CSSProperties } from 'vue';

export default defineComponent({
    props: {
        // function to fetch loader value
        fetchFunc: { type: Function, required: true },
        updateInterval: Number,
        minValue: { type: Number, required: true },
        maxValue: { type: Number, required: true }
    },
    data() : {
        loaderWidth: CSSProperties,
        collectTimer?: number
    } {
        return {
            loaderWidth: { width: "10%" }
        }
    },
    mounted() {
        this.collectTimer = window.setInterval(this.update, this.updateInterval);
    },
    computed: {
        computedLoaderWidth(): CSSProperties {
            return this.loaderWidth
        },
    },
    methods: {
        update() {
            let rawValue = this.fetchFunc();
            if (isNaN(rawValue)) {
                return;
            }
            let value = this.translate(rawValue);

            this.loaderWidth.width = value + "%";
        },

        translate(value: number): number {
            return 100 / this.maxValue * value
        },

    }

})
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
}
</style>