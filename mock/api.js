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
                content: '' +
                    'Rust是一门专注于安全、速度和并发的编程语言。它设计为高性能、底层控制，同时提供高级语言的强大抽象能力。' +
                    '这些特点使得Rust适合有类C语言经验，正寻求一门更安全的语言的开发者，同时也适合有类Python语言经验，需求更好性能的开发者。   ' +
                    '\n\nRust多数情况下在编译期进行安全检查和内存管理决策，因此运行时性能几乎没有损失。这使得Rust在一些其他编程语言不擅长的领域大显身手：' +
                    '空间和时间有限，嵌入其他语言，编写底层代码（驱动和操作系统）。Rust也擅长web应用，它驱动着Rust包管理网站。   ' +
                    '\n## 开发环境配置' +
                    '\n配置好vundle并安装YouCompleteMe   ' +
                    '\n\n安装rust，cargo；   ' +
                    '\n\n安装rust-src，YouCompleteMe补全需要；   ' +
                    '\n\n安装rustfmt，用以格式化代码（可选）；   ' +
                    '\n\nYouCompleteMe在编译时开启 --racer-completer 参数，启用rust补全； ' +
                    '\n\n> YouCompleteMe在编译时开启 --racer-completer 参数，启用rust补全； ' +
                    '\n\n>> YouCompleteMe在编译时开启 --racer-completer 参数，启用rust补全； ' +
                    '\n\n在vimrc中添加补全配置：   ' +
                    '\n``` vimrc  ' +
                    '\nlet g:ycm_rust_src_path = "/usr/src/rust/src"   ' +
                    '\n```  ' +
                    '\n在vimrc中添加代码格式化配置（可选）：   ' +
                    '\n``` vimrc  ' +
                    '\nautocmd FileType rust map <buffer> <F3> :!rustfmt --write-mode overwrite %<CR><CR>   ' +
                    '\n```  ' +
                    '\n## Cargo介绍   ' +
                    '\nCargo是rust的包管理器，类似于npm与node.js，同时也是Rust的项目构建工具，由Rust编写而成。Cargo会将依赖库下载至~/.cargo下。   ' +
                    '\n先挖坑，再填坑...',
                typestring: 'IT',
                labels: 'programming language,rust',
                date: '2017-07-16 18:16:09'
            }
            res.type('json')
            res.send(a)
        }
    }, {
        api: '/api/getArticleNav',
        response: (req, res) => {
            res.type('json')
            res.send({
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
        api: '/api/getComments',
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
