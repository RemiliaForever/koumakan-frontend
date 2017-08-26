/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */
var Mock = require('mockjs')

module.exports = [{
    api: '/api/hello',
    response: function (req, res) {
        res.type('json')
        var data = Mock.mock({
            'regexp|1-5': /\d{5,10}-/
        })
        res.send(data)
    }
}]
