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
            let articles = []
            for (let i=0; i<Random.integer(1, 10); i++) {
                articles.push({
                    id: Random.integer(1, 100),
                    title: Random.cword(1, 30),
                    brief: Random.cparagraph(1, 200),
                    category: Random.cword('IT|ACG|DAILY'),
                    labels: 'test,asdf,tas',
                    date: Random.datetime('%Y年%m月%d日 %H:%M:%S')
                })
            }
            sendJson(res, articles)
        }
    }, {
        api: '/articles/1',
        response: (req, res) => {
            sendJson(res, {
                id: Random.integer(1, 100),
                title: Random.cword(1, 30),
                brief: Random.cparagraph(1, 200),
                content: Random.cparagraph(1, 3000),
                category: Random.cword('IT|ACG|DAILY'),
                labels: 'test,asdf,tas',
                date: Random.datetime('%Y年%m月%d日 %H:%M:%S')
            })
        }
    }, {
        api: '/articles/1/nav',
        response: (req, res) => {
            sendJson(res, {
                pre: {
                    id: -1,
                    title: '没有了'
                },
                next: {
                    id: 2,
                    title: '冈格尼尔，不中的必中之枪'
                }
            })
        }
    }, {
        api: '/comments',
        response: (req, res) => {
            let comments = []
            for (let i=0; i<Random.integer(1, 30); i++) {
                comments.push({
                    id: Random.integer(1, 100),
                    article_id: Random.integer(1, 100),
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
