import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import routes from './routes'
Vue.use(VueRouter)

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
Vue.use(MuseUI)

// mathjax 支持
// import MathJax from 'mathjax'
// Vue.prototype._mathjax = MathJax
// Vue._mathjax.Hub = {Config: {
//     'extensions': ['tex2jax.js'],
//     'jax': ['input/TeX', 'output/HTML-CSS'],
//     'tex2jax': {
//         inlineMath: [['$', '$'], ['\\(', '\\)']],
//         displayMath: [['$$', '$$'], ['\\[', '\\]']],
//         processEscapes: true
//     },
//     'HTML-CSS': {availableFonts: ['TeX']}
// }}
// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
    mode: 'history',
    routes: routes
})

// 全局注册post接口
Vue.prototype.post = async (url, json) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    })
    return await response.json()
}

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
