<template>
    <div class="load-indicator-wrapper">
        <div id="loader" class="load-indicator" v-bind:style="{ width: computedLoaderWidth, backgroundColor: computedLoaderColor }" />
    </div>
</template>

<script>
const loaderColorLow = "#D9D9D9";
const loaderColorMid = "#16F289";
const loaderColorHigh = "#D86C6C";


export default {
    props: {
        // function to fetch loader value
        fetchFunc: { type: Function },
        updateInterval: Number,
    },
    data() {
        return {
            loaderWidth: "0%",
            loaderColor: loaderColorLow,
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
        computedLoaderColor() {
            return this.loaderColor
        }
    },
    methods: {
        update() {
            let value = this.fetchFunc();
            if (isNaN(value)) {
                return;
            }

            this.loaderWidth = value + "%";

            if (value < 20) {
                this.loaderColor = loaderColorLow;
            } else if (value < 80) {
                this.loaderColor = loaderColorMid;
            } else {
                this.loaderColor = loaderColorHigh;
            }
        },
    }
}

</script>

<style>
.load-indicator-wrapper {
    width: 100%;
    /* height: 3px; */
    background-color: #6A6A6A;
}

.load-indicator {
    height: 3px;
    background: rgb(22,242,137);
    background: linear-gradient(90deg, rgba(22,242,137,1) 0%, rgba(22, 242, 213, 1) 100%);
    border-radius: 10px;
    transition: width 0.8s ease-out;
}
</style>