<template>
    <md-whiteframe md-elevation="3" class="paper">
        <div v-if="!isLogin">
            <p class="title">后台登录入口</p>
            <div class="search">
                <md-input-container md-inline>
                    <label>Token</label>
                    <md-input type="password" v-model="pass" @keyup.native.enter="login"></md-input>
                </md-input-container>
            </div>
        </div>
        <div v-else>
            <p class="title">文章编辑</p>
            <div class="tab">
                <md-input-container>
                    <label>Id</label>
                    <md-input v-model="article.id" disabled></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Date</label>
                    <md-input v-model="article.date" disabled></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Title</label>
                    <md-input v-model="article.title"></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Category</label>
                    <md-select name="category" v-model="article.category">
                        <md-option value="IT">IT技术</md-option>
                        <md-option value="ACG">ACG见闻</md-option>
                        <md-option value="DAILY">生活琐记</md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <label>Tags</label>
                    <md-input v-model="article.labels"></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Brief</label>
                    <md-textarea v-model="article.brief"></md-textarea>
                </md-input-container>
            </div>
            <md-layout class="editor">
                <md-layout md-flex="1" class="textarea">
                    <textarea v-model="article.content"></textarea>
                </md-layout>
                <md-layout md-flex="1" class="preview">
                    <div id="preview" class="markdown-body hljs">
                    </div>
                </md-layout>
            </md-layout>
            <md-layout style="margin-top:10px">
                <md-button id="load" class="md-raised md-primary" @click="$refs.dialog.open()">载入</md-button>
                <md-button class="md-raised md-primary" @click="submit">提交</md-button>
            </md-layout>

            <md-dialog md-open-from="#load" md-close-to="#load" ref="dialog">
                <md-dialog-title>输入文章ID</md-dialog-title>
                <md-dialog-content>
                    <md-input-container>
                        <label>文章ID</label>
                        <md-input type="number" v-model="loadId"></md-input>
                    </md-input-container>
                </md-dialog-content>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="$refs.dialog.close()">Cancel</md-button>
                    <md-button class="md-primary" @click="load" :disabled="!loadId">Ok</md-button>
                </md-dialog-actions>
            </md-dialog>

            <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="3000">
                <span>{{ message }}</span>
            </md-snackbar>
        </div>
    </md-whiteframe>
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
                pass: '',
                isLogin: false,
                article: {
                    id: null,
                    title: '',
                    brief: '',
                    content: '',
                    category: '',
                    labels: '',
                    date: ''
                },
                loadId: null,
                message: ''
            }
        },
        watch: {
            'article.content'() {
                document.getElementById('preview').innerHTML = marked(this.article.content)
            }
        },
        methods: {
            login() {
                this.$http.post('/login', this.pass)
                    .then(res => {
                        this.isLogin = true
                    }).catch(e => {
                        this.pass = ''
                    })
            },
            load() {
                this.$http.get('/articles/' + this.loadId)
                    .then(res => {
                        this.article = res.data
                    })
                this.$refs.dialog.close()
            },
            submit() {
                if (this.article.id) {
                    this.$http.put('/articles', this.article)
                        .then(res => {
                            this.message = res.data
                            this.$refs.snackbar.open()
                        }).catch(e => {
                            this.message = e
                            this.$refs.snackbar.open()
                        })
                } else {
                    this.$http.post('/articles', this.article)
                        .then(res => {
                            this.message = res.data
                            this.$refs.snackbar.open()
                        }).catch(e => {
                            this.message = e
                            this.$refs.snackbar.open()
                        })
                }
            }
        },
        mounted() {
            this.$http.get('/login')
                .then(res => {
                    this.isLogin = true
                })
            this.$emit('changeTitle', 'Admin Page')
        }
    }
</script>

<style lang="scss">
    .paper {
        padding: 15px;
        min-height: 500px;
        background-color: #ffffff;
        .title {
            text-align: center;
            font-size: 32px;
        }
    }
    .search {
        width: 70%;
        margin: 100px auto;
        padding: 1px 30px;
        background-color: #ebebeb;
        border-radius: 35px;
    }
    .tab {
        & > div {
            margin-top: -10px;
        }
    }
    .editor {
        min-height: 350px;
        .textarea, .preview {
            min-height: 100%;
            border: solid 1px gray;
        }
    }
    .textarea > textarea {
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        resize: none;
        margin: -1px;
        padding: 5px;
    }
    #preview {
        padding: 5px;
        width: 100%;
        display: block;
        @import '~assets/markdown.scss';
    }
</style>
