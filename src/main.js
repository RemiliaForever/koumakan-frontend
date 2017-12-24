require('es6-promise').polyfill()

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import routes from './routes'
Vue.use(VueRouter)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

import 'github-markdown-css'

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
    mode: 'history',
    routes: routes
})


// axios
import axios from 'axios'
axios.defaults.responseType = 'json'
axios.defaults.baseURL = 'https://api.blog.koumakan.cc'
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://localhost:8080'

Vue.prototype.$http = axios

window.__lendApp__ = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
