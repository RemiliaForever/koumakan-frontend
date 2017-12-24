<template>
    <div>
        <md-whiteframe class="article">
            <p class="title">{{ article.title }}</p>
            <div class="info">
                <div class="date">
                    <md-icon>date_range</md-icon>
                    <span>{{ article.date }}</span>
                </div>
                <div class="labels" v-for="label in article.labels.split(',')" :key="label">
                    <md-icon>turned_in</md-icon>
                    <router-link :to="'/label/' + label">{{ label }}</router-link>
                </div>
            </div>
            <p class="brief">{{ article.brief }}</p>
            <div id="content" class="markdown-body">
            </div>
            <md-divider/>
            <div class="nav">
                <md-button :disabled="buttonNav.pre.id <= 0" class="left md-primary"
                    @click="$router.push('/article/'+buttonNav.pre.id)">
                    上一篇：{{ buttonNav.pre.title }}
                </md-button>
                <md-button :disabled="buttonNav.next.id <= 0" class="right md-primary"
                    @click="$router.push('/article/'+buttonNav.next.id)">
                    下一篇：{{ buttonNav.next.title }}
                </md-button>
            </div>
        </md-whiteframe>
        <md-whiteframe class="comment-list" v-if="comments.length>0">
            <p class="title">
                评论列表
            </p>
            <div v-for="comment,index in comments">
                <md-divider/>
                <div class="c-item">
                    <img class="c-avatar" :src="comment.avatar"/>
                    <a class="c-name" :href="comment.website">{{ comment.name }}</a>
                    <span class="c-date">#{{ index + 1 }}&nbsp;&nbsp;{{ comment.date }}</span>
                    <p class="c-content">{{ comment.content }}</p>
                </div>
            </div>
        </md-whiteframe>
        <md-whiteframe class="comment-list" v-else>
            <p style="font-size: 22px; text-align: center">
                目前尚未有评论。
            </p>
        </md-whiteframe>
        <md-whiteframe class="form">
            <p class="title">发表评论</p>
            <p class="subtitle">电子邮件地址不会被公开</p>
            <md-input-container fullwidth>
                <label>评论</label>
                <md-textarea required v-model.trim="formData.content" style="min-height: 73px;"/>
            </md-input-container>
            <md-input-container>
                <label>昵称</label>
                <md-input required v-model.trim="formData.name"/>
            </md-input-container>
            <md-input-container>
                <label>电子邮件</label>
                <md-input required v-model.trim="formData.email" type="email"/>
            </md-input-container>
            <md-input-container>
                <label>站点</label>
                <md-input v-model.trim="formData.website" type="url"/>
            </md-input-container>
            <md-button class="md-raised md-primary" :disabled="buttonSubbmitDisabled" @click="addComment">
                <md-icon>send</md-icon>
                <label>{{ buttonSubbmit.text }}</label>
            </md-button>
        </md-whiteframe>
    </div>
</template>

<script>
    import 'highlight.js/styles/github.css'
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
                buttonNav: {
                    pre: {id: -1, title: '载入中...'},
                    next: {id: -1, title: '载入中...'}
                },
                formData: {
                    content: '',
                    name: '',
                    email: '',
                    website: ''
                },
                buttonSubbmit: {
                    isSending: false,
                    isSent: false,
                    text: '提交评论'
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
                    form.email == '' ||
                    this.buttonSubbmit.isSending ||
                    this.buttonSubbmit.isSent
            }
        },
        methods: {
            getData() {
                let id = this.$route.params.id
                this.$emit('changeTitle', '载入中...')
                // get article
                this.$http.get('/articles/'+id)
                    .then(res => {
                        this.article = res.data
                        if (!this.article || this.article.id < 0) {
                            this.$router.push('/notfound')
                        }
                        this.$emit('changeTitle', this.article.title)
                        document.getElementById('content').innerHTML = marked(this.article.content)
                    })
                // get nav
                this.$http.get('/articles/'+id+'/nav')
                    .then(res => this.buttonNav = res.data)
                // get comment
                this.$http.get('/comments/'+id)
                    .then(res => this.comments = res.data)
            },
            addComment() {
                let id = this.$route.params.id
                this.buttonSubbmit.isSending = true
                this.buttonSubbmit.text = '发送中'
                this.$http.post('/comments', {
                    article_id: parseInt(this.$route.params.id),
                    name: this.formData.name,
                    email: this.formData.email,
                    website: this.formData.website,
                    content: this.formData.content,
                    avatar: '',
                    date: ''
                }).then(res => {
                    this.buttonSubbmit.isSending = false
                    this.buttonSubbmit.isSent = true
                    this.buttonSubbmit.text = '已发送'
                    // refresh comment
                    this.$http.get('/comments/'+id)
                        .then(res => this.comments = res.data)
                }).catch(error=>{
                    this.buttonSubbmit.isSending = false
                    this.buttonSubbmit.text = '重新发送'
                })
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
            margin: 20px auto;
            font-weight: 500;
        }
        .info {
            margin: 0 auto;
            line-height: 36px;
            text-align: center;
            .date, .labels {
                height: 36px;
                display: inline;
                color: gray;
                a {
                    color: gray;
                }
            }
            .date {
                margin-right: 30px;
            }
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
            @import '~assets/markdown.scss';
        }
    }
    .nav {
        margin: 0px 12px -10px 12px;
        .left {
            float: left;
        }
        .right {
            float: right;
        }
    }
    .nav::after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
    }
    .comment-list {
        margin-top: 25px;
        padding: 25px;
        .title {
            font-size: 22px;
            margin: 0 0 5px 5px;
        }
        .c-item{
            padding: 8px;
            position: relative;
            .c-avatar {
                border-radius: 20%;
                border: lightgrey solid 2px;
                width: 56px;
                height: 56px;
            }
            .c-name {
                font-size: 16px;
                color: #474a4f;
                position: absolute;
                left: 72px;
                top: 10px;
            }
            .c-date {
                font-size: 14px;
                color: grey;
                position: absolute;
                left: 72px;
                top: 46px;
            }
            .c-content {
                font-size: 14px;
                padding: 0 8px;
            }
        }
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
            max-width: 400px;
            margin-bottom: 5px;
        }
        & > div[fullwidth] {
            max-width: 100%;
        }
        & > button {
            margin-top: 15px;
        }
    }

</style>
