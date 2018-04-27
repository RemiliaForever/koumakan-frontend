<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import Component from 'vue-class-component'

    @Component
    export default class HelloWorld extends Vue {
        msg: string = 'Welcome to Your Vue.js App'

        mounted() {
            console.log('hello')
            console.log(this.$router)
        }

        hello() {
            console.log('123')
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
