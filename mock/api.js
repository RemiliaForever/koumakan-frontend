const Mock = require('mockjs')
const Random = Mock.Random

function sendJson(res, data) {
    res.type('json')
    setTimeout(()=>res.send(data), 1500)
}

module.exports = [
    {
        api: '/api/article',
        response: (req, res) => {
            sendJson(res, {id: Random.int(0, 99)})
        }
    }
]
