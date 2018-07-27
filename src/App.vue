<template>
    <div id="app">
        <img src="./assets/logo.png">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
    name: string = 'App'

    mounted() {
        console.log(123)
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
