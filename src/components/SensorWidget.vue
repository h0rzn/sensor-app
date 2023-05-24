<template>
    <div class="sensor-widget">
        <div class="sensor-value-container">
            <p class="sensor-value">444w</p>
        </div>
        <div class="sensor-name-container">
            <p class="sensor-name">Power</p>
        </div>
    </div>

</template>

<script>
export default {

}

</script>

<style>

.sensor-widget {
    width: 70px;
    height: 70px;
    border: 1px solid red;
    border-radius: 20%;
    display: flex;
    flex-direction: column;
}

p {
    margin: 0;
    padding-left: 5px;
}

.sensor-value-container {
    flex: 3;
    display: flex;
    align-items: center;
}
.sensor-value {
    font-size: 24px;
    font-weight: bold;
}

.sensor-name-container {
    flex: 2;
    /* background-color: green; */
}
.sensor-name {
    font-size: 12;
}


</style>