import Vue from 'vue'
import Vuex from 'vuex'
import VuexOption from 'store/global'
import Title from 'components/title'

Vue.use(Vuex)
var store = Vuex.Store(VuexOption)

describe('title.vue', () => {
    const txt = 'Hello Vue!'

    let vm
    beforeEach(function (done) {
        vm = new Vue({
            el: document.createElement('div'),
            store,
            render: (h) => h(Title, {
                props: {
                    text: txt
                }
            }),
            mounted: done
        })
    })

    it('document title will be the props', () => {
        expect(document.title).to.equal(txt)
    })
})
