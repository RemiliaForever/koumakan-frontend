<template>
    <div>
        <mu-paper class="article">
            <p class="title">{{ article.title }}</p>
            <mu-flexbox justify="center" wrap="wrap">
                <div class="date">
                    <mu-icon value="date_range"/>
                    <span>{{ article.date }}</span>
                </div>
                <div class="labels" v-for="label in article.labels.split(',')" :key="label">
                    <mu-icon value="turned_in"/>
                    <router-link :to="'/label/' + label">{{ label }}</router-link>
                </div>
            </mu-flexbox>
            <p class="brief">{{ article.brief }}</p>
            <div id="content"/>
            <mu-divider/>
            <mu-flexbox class="nav" justify="space-between" wrap="wrap">
                <mu-flat-button :disabled="buttonPre.target == null" :target="buttonPre.target" primary>{{ buttonPre.text }}</mu-flat-button>
                <mu-flat-button :disabled="buttonNext.target == null" :target="buttonNext.target" primary>{{ buttonNext.text }}</mu-flat-button>
            </mu-flexbox>
        </mu-paper>
        <mu-paper class="comment-list" v-if="comments.length>0">
            <p style="font-size: 22px; margin: 0 0 5px 5px">
                评论列表
            </p>
            <div v-for="(comment,index) in comments">
                <mu-divider/>
                <img class="c-avatar" :src="comment.avatar"/>
                <a class="c-name" :href="comment.website">{{ comment.name }}</a>
                <span class="c-date">#{{ index + 1 }} {{ comment.date }}</span>
                <p class="c-content">{{ comment.content }}</p>
            </div>
        </mu-paper>
        <mu-paper class="comment-list" v-else>
            <p style="font-size: 22px; text-align: center">
                目前尚未有评论。
            </p>
        </mu-paper>
        <mu-paper class="form">
            <p class="title">发表评论</p>
            <p class="subtitle">电子邮件地址不会被公开</p>
            <mu-text-field v-model.trim="formData.content" label="评论*" labelFloat fullWidth multiLine :rows="4"/><br/>
            <mu-text-field v-model.trim="formData.name" label="昵称*" labelFloat /><br/>
            <mu-text-field v-model.trim="formData.email" label="电子邮件*" type="email" labelFloat /><br/>
            <mu-text-field v-model.trim="formData.website" label="站点" type="url" labelFloat/><br/>
            <mu-raised-button label="提交评论" icon="send" labelPosition="before" secondary :disabled="buttonSubbmitDisabled"/>
        </mu-paper>
    </div>
</template>

<script>

// markdown 和 highlight 支持
import marked from 'marked'
import 'highlight.js/styles/github.css'
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value
    }
})
export default {
    data() {
        return {
            article: {
                title: '载入中',
                brief: '',
                content: '',
                type: 'unknown',
                labels: '',
                date: '0000-00-00 00:00:00'
            },
            comments: [],
            buttonPre: {
                target: null,
                text: '上一篇：载入中...'
            },
            buttonNext: {
                target: null,
                text: '下一篇：载入中...'
            },
            formData: {
                content: '',
                name: '',
                email: '',
                website: ''
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.getData()
        }
    },
    computed: {
        buttonSubbmitDisabled: function() {
            let form = this.formData
            return form.content == '' ||
                form.name == '' ||
                form.email == ''
        }
    },
    methods: {
        async getData() {
            let id = this.$route.path.split('/')[2]
            this.$emit('changeTitle', '载入中...')
            // get article
            let response = await fetch('/api/getArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
            this.article = await response.json()
            this.$emit('changeTitle', this.article.title)
            // render
            let content = document.getElementById('content')
            let data = '' +
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
'\n先挖坑，再填坑...'
            content.innerHTML = marked(data)
            // get nav
            this.buttonPre = {
                target: '/article/0',
                text: '上一篇: Rust'
            }
            this.buttonNext = {
                target: '/article/2',
                text: '下一篇: Rust'
            }

            // get comment
            response = await fetch('/api/getComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
            this.comments = await response.json()
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss">
    .article {
        padding: 15px;
        .title {
            text-align: center;
            font-size: 32px;
            margin: 0px;
        }
        .brief {
            font-size: 14px;
            color: gray;
            background-color: #f5f5f5;
            margin: 5px 1% 0px 1%;
            padding: 10px;
            text-indent: 28px;
        }
        #content {
            padding: 1% 3% 1% 3%;
            font-size: 16px;
        }
    }
    .nav {
        margin-top: 12px;
        padding-left: 12px;
        padding-right: 12px;
        & > button {
            padding-left: 16px;
            padding-right: 16px;
            flex: none;
        }
    }
    .comment-list {
        margin-top: 25px;
        padding: 25px;
    }
    .form {
        margin-top: 25px;
        margin-bottom: 12px;
        padding: 25px;
        .title {
            font-size: 22px;
            margin: 0px;
        }
        .subtitle {
            color: gray;
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 0px;
        }
        & > div {
            margin-bottom: -4px;
        }
        & > button {
            margin-top: 15px;
        }
    }
    .date, .labels {
        display: inline;
        height: 36px;
        line-height: 36px;
        color: gray;
        flex: none;
        i {
            position: relative;
            top: 6px;
            left: 4px;
        }
        a {
            color: gray;
        }
    }
    .date {
        margin-right: 10px;
    }

    #content {
        p {
            margin: 10px;
            text-indent: 2em;
        }

        h1,h2,h3,h4,h5,h6 {
            font-weight: 400;
            text-shadow: 1px 1px 2px #333333;
        }

        pre {
            background-color: #cdcdcd;
            padding: 5px;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            code {
                display: block;
                padding: 5px;
                background-color: #ebebeb;
                font-size: 14px;
                word-wrap: break-word;
            }
        }
        blockquote {
            border-left: 5px solid #cdcdcd;
        }
    }
</style>
