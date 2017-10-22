import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
Vue.use(MuseUI)
import App from 'src/app'

describe('app.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(App)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('.hello h1'))
            .to.equal(null)
    })
})
