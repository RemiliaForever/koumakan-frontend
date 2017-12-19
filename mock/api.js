const Mock = require('mockjs')
const Random = Mock.Random

function sendJson(res, data) {
    res.type('json')
    setTimeout(()=>res.send(data), 1500)
}

categoryList = ['IT', 'ACG', 'DAILY', 'OTHER']

module.exports = [
    {
        api: '/articles/:id/nav',
        response: (req, res) => {
            sendJson(res, {
                pre: {
                    id: req.params.id-1,
                    title: '没有了'
                },
                next: {
                    id: Number(req.params.id)+1,
                    title: '冈格尼尔，不中的必中之枪'
                }
            })
        }
    }, {
        api: '/articles/:id',
        response: (req, res) => {
            sendJson(res, {
                id: req.params.id,
                title: Random.cword(1, 30),
                brief: Random.cword(1, 300),
                content: Random.cparagraph(1, 3000),
                category: categoryList[Random.integer(0, 3)],
                labels: 'test,asdf,tas',
                date: Random.datetime('yyyy年M月d日 H:m:s')
            })
        }
    }, {
        api: '/articles',
        response: (req, res) => {
            let articles = []
            for (let i=0; i<Random.integer(1, 10); i++) {
                articles.push({
                    id: Random.integer(1, 100),
                    title: Random.cword(1, 30),
                    brief: Random.cword(1, 300),
                    category: categoryList[Random.integer(0, 3)],
                    labels: 'test,asdf,tas',
                    date: Random.datetime('yyyy年M月d日 H:m:s')
                })
            }
            sendJson(res, articles)
        }
    }, {
        api: '/comments/:aid',
        response: (req, res) => {
            let comments = []
            for (let i=0; i<Random.integer(1, 30); i++) {
                comments.push({
                    id: Random.integer(1, 100),
                    article_id: req.params.aid,
                    name: Random.word(),
                    email: Random.email('koumakan.cc'),
                    website: Random.url(),
                    content: Random.paragraph(1, 10),
                    avatar: Random.url(),
                    date: Random.date()
                })
            }
            sendJson(res, comments)
        }
    }, {
        api: '/archive',
        response: (req, res) => {
            let data = {}
            for (let i=0; i<Random.integer(1, 30); i++) {
                data[Random.cword(2, 10)] = Random.integer(0, 10)
            }
            sendJson(res, data)
        }
    }, {
        api: '/labels',
        response: (req, res) => {
            let data = {}
            for (let i=0; i<Random.integer(1, 30); i++) {
                data[Random.cword(2, 10)] = Random.integer(0, 10)
            }
            sendJson(res, data)
        }
    }
]
