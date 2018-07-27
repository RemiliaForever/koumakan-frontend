import 'es6-promise/auto'

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueResourceMock from 'vue-resource-mock'
import APIList from '@/api'
import App from '@/App.vue'
import router from '@/router'

Vue.use(VueResource)
let http = {root: ''}
// 给定后端服务器，使用后端服务器
if (process.env.MOCK_SERVER) {
    http.root = process.env.MOCK_SERVER
// 未给定MOCK服务器，开发模式使用本地MOCK
} else if (process.env.NODE_ENV == 'development') {
    Vue.use(VueResourceMock, APIList)
} else {
    http.root = process.env.BACKEND_SERVER ? process.env.BACKEND_SERVER : 'https://api.blog.koumakan.cc'
}

new Vue({
    el: '#app',
    http,
    router,
    render: h => h(App)
})

