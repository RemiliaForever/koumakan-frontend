// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import routes from './routes'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

Vue.use(VueRouter)
Vue.use(MuseUI)

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
    mode: 'history',
    routes: routes
})

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
            // console.log('scrollIntoViewIfNeeded');
        }, 400)
    }
}, false)
