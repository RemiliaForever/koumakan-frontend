// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

const fs = require('fs')
const path = require('path')
const argv = require('optimist').argv
const express = require('express')
const config = require('../config')
const proxyMiddleware = require('http-proxy-middleware')
const opn = require('opn')
const app = express()
const port = process.env.PORT || config.build.port
// var proxyTable = config.dev.proxyTable

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = {target: options}
//   }
//   app.use(proxyMiddleware(context, options))
// });

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

// serve pure static assets
const staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static(path.resolve(__dirname, '../dist/static')))

app.use(function(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'), {
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    })
})
module.exports = app.listen(port, '0.0.0.0', function(err) {
    if (err) {
        console.log(err)
        return
    }
    const uri = 'http://0.0.0.0:' + port
    console.log('Build server listening at ' + uri + '\n')
    opn(uri)
})
