import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import Component from 'vue-class-component'
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate' // for vue-router 2.2+
])

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
