<template>
  <DashBoard />
</template>

<script>
import DashBoard from './components/DashBoard.vue';

export default {
  name: 'App',
  components: {
    DashBoard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
body {
  margin: 0;
}
</style>
