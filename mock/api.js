const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    {
        api: '/blog/getArticleList',
        response: (req, res) => {
            let a = {title: '这是标题', brief: '简介'}
            let data = []
            res.type('json')
            res.send(data)
        }
    }, {
        api: '/blog/getAllLabel',
        response: (req, res) => {
            let data = []
            for (let i=0; i<20; i++) {
                data.push({
                    name: Random.cword(2, 6),
                    count: Random.integer(0, 100).toString()
                })
            }
            res.type('json')
            res.send(data)
        }
    }, {
        api: '/blog/getArchive',
        response: (req, res) => {
            let data = []
            for (let i=0; i<20; i++) {
                data.push({
                    name: Random.date('yyyy-MM'),
                    count: Random.integer(0, 100).toString()
                })
            }
            res.type('json')
            res.send(data)
        }
    }
]
