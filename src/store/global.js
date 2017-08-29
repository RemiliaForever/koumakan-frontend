// 生成 mutations 方法
function generate(name) {
    return function(state, value) {
        state[name] = value || state[name]
    }
}

const options = {
    state: {
        pageWidth: 100
    },
    actions: {},
    mutations: {}
}

Object.keys(options.state).forEach((key) => {
    options.mutations[key] = generate(key)
})

export default options
