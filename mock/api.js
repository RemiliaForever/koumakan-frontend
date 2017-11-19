const Mock = require('mockjs')
const Random = Mock.Random

function sendJson(res, data) {
    res.type('json')
    setTimeout(()=>res.send(data), 1500)
}

module.exports = [
    {
        api: '/articles',
        response: (req, res) => {
            sendJson(res, {id: Random.int(0, 99)})
        }
    }, {
        api: '/articles/1',
        response: (req, res) => {
            sendJson(res, {})
        }
    }, {
        api: '/articles/1/nav',
        response: (req, res) => {
            sendJson(res, {})
        }
    }, {
        api: '/comments',
        response: (req, res) => {
            sendJson(res, {})
        }
    }, {
        api: '/archive',
        response: (req, res) => {
            sendJson(res, {})
        }
    }, {
        api: '/labels',
        response: (req, res) => {
            sendJson(res, {})
        }
    }
]
