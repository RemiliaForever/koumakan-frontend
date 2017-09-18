const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    {
        api: '/api/getArticleList',
        response: (req, res) => {
            let a = {
                id: '1',
                title: 'Rust语言学习总结',
                brief: '     作为Vim重度用户，YouCompleteMe自然是必不可少，在支持的这么多语言中，C/C++、Go、JavaScript、c#都或多或少了解过，只有Rust没有了解。在初步查阅资料后，对这个高性能、编译期检查、无GC的语言产生了浓厚的兴趣（对比C++复杂的智能指针以及移动语义），因此决定深入了解一下Rust的语言特性。',
                typestring: 'IT',
                labels: 'programming language,rust,haha',
                date: '2017-07-16 18:16:09'
            }
            let data = []
            data.push(a)
            data.push(a)
            data.push(a)
            data.push(a)
            data.push(a)
            res.type('json')
            res.send(data)
        }
    }, {
        api: '/api/getArticle',
        response: (req, res) => {
            let a = {
                id: Random.integer(),
                title: 'Rust语言学习总结',
                brief: '作为Vim重度用户，YouCompleteMe自然是必不可少，在支持的这么多语言中，C/C++、Go、JavaScript、c#都或多或少了解过，只有Rust没有了解。在初步查阅资料后，对这个高性能、编译期检查、无GC的语言产生了浓厚的兴趣（对比C++复杂的智能指针以及移动语义），因此决定深入了解一下Rust的语言特性。',
                content: '## aaaaa\n###asdf',
                typestring: 'IT',
                labels: 'programming language,rust',
                date: '2017-07-16 18:16:09'
            }
            res.type('json')
            res.send(a)
        }
    }, {
        api: '/api/getComment',
        response: (req, res) => {
            let a = {
                id: 1234,
                article_id: 123,
                name: Random.word(5, 20),
                email: Random.email(),
                website: Random.url(),
                avatar: Random.url(),
                date: Random.datetime(),
                content: Random.cword(0, 200)
            }
            let data = []
            data.push(a)
            res.type('json')
            res.send(data)
        }
    }, {
        api: '/api/getLabel',
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
        api: '/api/getArchive',
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
