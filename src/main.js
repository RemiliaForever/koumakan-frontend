require('es6-promise').polyfill()

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import routes from './routes'
Vue.use(VueRouter)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
    mode: 'history',
    routes: routes
})


// axios
import axios from 'axios'
axios.default.responseType = 'json'

axios.interceptors.request.use((config)=>{
    console.log('pre-request')
    return config
})
axios.interceptors.response.use((response)=>{
    console.log('pre-response')
    return response
})
Vue.prototype.axios = axios

window.__lendApp__ = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function(event) {
    let element = event.target
    let tags = {
        'INPUT': 1,
        'TEXTAREA': 1
    }
    if ((element.tagName in tags)) {
        setTimeout(function() {
            element.scrollIntoViewIfNeeded()
            console.log('scrollIntoViewIfNeeded')
        }, 400)
    }
}, false)
