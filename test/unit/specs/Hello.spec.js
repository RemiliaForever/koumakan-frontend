import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
Vue.use(MuseUI)
import Card from 'src/components/card'

describe('Hello.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Card)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('.hello h1'))
            .to.equal(null)
    })
})
