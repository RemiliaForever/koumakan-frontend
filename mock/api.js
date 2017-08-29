const Mock = require('mockjs')

module.exports = [
    {
        api: '/api/hello',
        response: function(req, res) {
            res.type('json')
            let data = Mock.mock({
                'regexp|1-5': /\d{5,10}-/
            })
            res.send(data)
        }
    }
]
