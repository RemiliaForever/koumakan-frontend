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
        <mu-paper class="comment-list" v-if="comment.length=0">
        </mu-paper>
        <mu-paper class="comment-list" v-else>
            <p style="font-size: 22px; text-align: center">
                目前尚未有评论。
            </p>
        </mu-paper>
        <mu-paper class="form">
            <p class="title">发表评论</p>
            <p class="subtitle">电子邮件地址不会被公开</p>
            <mu-text-field v-model="formData.content" label="评论*" labelFloat fullWidth multiLine :rows="3"/><br/>
            <mu-text-field v-model="formData.name" label="昵称*" labelFloat /><br/>
            <mu-text-field v-model="formData.email" label="电子邮件*" labelFloat /><br/>
            <mu-text-field v-model="formData.website" label="站点" labelFloat/><br/>
            <mu-raised-button label="提交评论" icon="android" primary :disabled="buttonSubbmitDisabled"/>
        </mu-paper>
    </div>
</template>

<script>
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
                comment: [],
                buttonPre: {
                    target: null,
                    text: '上一篇：载入中...'
                },
                buttonNext: {
                    target: null,
                    text: '下一篇：载入中...'
                },
                formData: {
                    content: null,
                    name: null,
                    email: null,
                    website: null
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
                    form.content == null ||
                    form.name == '' ||
                    form.name == null ||
                    form.email == '' ||
                    form.email == null
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
                    '### abc' + '\n' +
                    '``` python' + '\n' +
                    'def a():' + '\n' +
                    '    print(1)' + '\n' +
                    '```' + '\n' +
                    '$$a^2+b^2=c^2$$'
                content.innerHTML = this.marked(data)
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
                this.comment = await response.json()
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style lang="scss" scoped>
    .article {
        padding: 15px;
        .title {
            text-align: center;
            font-size: 32px;
            margin: 0px;
        }
        .brief {
            font-size: 15px;
            color: gray;
            background-color: #f5f5f5;
            margin: 0px;
            padding: 10px;
            text-indent: 28px;
        }
        #content {
            padding: 1% 3% 1% 3%;
        }
    }
    .nav{
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
            margin-bottom: 8px;
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
</style>
