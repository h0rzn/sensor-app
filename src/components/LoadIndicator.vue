<template>
    <div class="load-indicator-wrapper">
        <div id="loader" class="load-indicator" v-bind:style="{ width: computedLoaderWidth }" />
    </div>
</template>

<script>
export default {
    props: {
        // function to fetch loader value
        fetchFunc: { type: Function },
        updateInterval: Number,
        minValue: Number,
        maxValue: Number
    },
    data() {
        return {
            loaderWidth: "0%",
            collectTimer: undefined
        }
    },
    mounted() {
        this.collectTimer = setInterval(this.update, this.updateInterval);
    },
    computed: {
        computedLoaderWidth() {
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

            this.loaderWidth = value + "%";
        },
        translate(value) {
            return 100 / this.maxValue * value
        },

    }
}

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