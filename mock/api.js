const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    {
        api: '/blog/getArticleList',
        response: (req, res) => {
            let a = {
                id: '1',
                title: 'Rust语言学习总结',
                brief: '     作为Vim重度用户，YouCompleteMe自然是必不可少，在支持的这么多语言中，C/C++、Go、JavaScript、c#都或多或少了解过，只有Rust没有了解。在初步查阅资料后，对这个高性能、编译期检查、无GC的语言产生了浓厚的兴趣（对比C++复杂的智能指针以及移动语义），因此决定深入了解一下Rust的语言特性。',
                type: 'IT',
                labels: ['programming language', 'rust', 'haha'],
                date: '2017-07-16 18:16:09'
            }
            let data = []
            data.push(a)
            res.type('json')
            res.send(data)
        }
    }, {
        api: '/blog/getArticle',
        response: (req, res) => {
            let a = {
                title: 'Rust语言学习总结',
                brief: '作为Vim重度用户，YouCompleteMe自然是必不可少，在支持的这么多语言中，C/C++、Go、JavaScript、c#都或多或少了解过，只有Rust没有了解。在初步查阅资料后，对这个高性能、编译期检查、无GC的语言产生了浓厚的兴趣（对比C++复杂的智能指针以及移动语义），因此决定深入了解一下Rust的语言特性。',
                content: '<p>Rust是一门专注于安全、速度和并发的编程语言。它设计为高性能、底层控制，同时提供高级语言的强大抽象能力。这些特点使得Rust适合有类C语言经验，正寻求一门更安全的语言的开发者，同时也适合有类Python语言经验，需求更好性能的开发者。</p><p>Rust多数情况下在编译期进行安全检                           <p>配置好vundle并安装YouCompleteMe</p>                            <p>安装rust，cargo；</p>                            <p>安装rust-src，YouCompleteMe补全需要；</p>                            <p>安装rustfmt，用以格式化代码（可选）                  <p>先挖坑，再填坑...</p>',
                type: 'IT',
                label: ['programming language', 'rust'],
                date: '2017-07-16 18:16:09'
            }
            res.type('json')
            res.send(a)
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
