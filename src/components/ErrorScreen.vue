<template>
    <div>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: {"message": String}
};
</script>

<style>
p {
    font-size: 16px;
    font-weight: bold;
    color: #C1C1C1;
}
</style>