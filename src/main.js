import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import routes from './routes'
Vue.use(VueRouter)

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
Vue.use(MuseUI)
// markdown 和 highlight 支持
import marked from 'marked'
import 'highlight.js/styles/github.css'
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value
    }
})
Vue.prototype.marked = marked
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
