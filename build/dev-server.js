require('./check-versions')()

let config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let fs = require('fs')
let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let argv = require('optimist').argv
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
let autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable

let app = express()
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})

// // proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//     var options = proxyTable[context]
//     if (typeof options === 'string') {
//         options = { target: options }
//     }
//     app.use(proxyMiddleware(options.filter || context, options))
// })

// mock/proxy api requests
const mockDir = path.resolve(__dirname, '../mock');
(function setMock(mockDir) {
    fs.readdirSync(mockDir).forEach(function(file) {
        const filePath = path.resolve(mockDir, file)
        let mocks
        if (fs.statSync(filePath).isDirectory()) {
            setMock(filePath)
        } else {
            mocks = require(filePath)
            mocks.forEach(mock =>
                app.use(mock.api, argv.proxy ? proxyMiddleware({target: 'http://' + argv.proxy}) : mock.response))
        }
    })
})(mockDir)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

let server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
