<template>
    <div>
        <md-whiteframe class="article">
            <p class="title">{{ article.title }}</p>
            <div>
                <div class="date">
                    <md-icon value="date_range"/>
                    <span>{{ article.date }}</span>
                </div>
                <div class="labels" v-for="label in article.labels.split(',')" :key="label">
                    <md-icon value="turned_in"/>
                    <router-link :to="'/label/' + label">{{ label }}</router-link>
                </div>
            </div>
            <p class="brief">{{ article.brief }}</p>
            <div id="content">
                {{ article.content }}
            </div>
            <md-divider/>
            <div class="nav">
                <md-button :disabled="buttonNav.pre.id <= 0" :to="buttonNav.pre.id>0?'/article/'+buttonNav.pre.id:null" primary>
                    上一篇：{{ buttonNav.pre.title }}
                </md-button>
                <md-button :disabled="buttonNav.next.id <= 0" :to="buttonNav.next.id>0?'/article/'+buttonNav.next.id:null" primary>
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
    // highlight
    import Hljs from 'highlight.js'
    import 'highlight.js/styles/github.css'

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
            async getData() {
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
                        // render
                        let blocks = document.getElementById('content').querySelectorAll('pre code')
                        Hljs.highlightBlock(blocks)
                    })
                // get nav
                this.$http.get('/articles/'+id+'/nav')
                    .then(res => this.buttonNav = res.data)
                // get comment
                this.$http.post('/comments/aid/'+id)
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
                    this.comments = this.post('/api/getComments', {id: id})
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
            margin: 0px;
            font-weight: 500;
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
        & > * {
            padding-left: 16px;
            padding-right: 16px;
            flex: none;
        }
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
    .toast {
        left: auto;
        right: auto;
        bottom: 7%;
    }

    #content {
        p {
            margin: 10px;
            text-indent: 2em;
        }

        h1,h2,h3,h4,h5,h6 {
            font-weight: 500;
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
