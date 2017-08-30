<template>
    <div>
        <mu-card v-for="article in articles" :key="article.date">
            <mu-card-title title="article.title"/>
            <mu-card-text>
                {{ article.brief }}
            </mu-card-text>
            <mu-card-actions>
                <mu-flat-button label="Action 2"/>
            </mu-card-actions>
        </mu-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articles: null,
                dialog: false
            }
        },
        watch: {
            '$route'(to, from) {
                this.getArticleList()
            }
        },
        methods: {
            async getArticleList() {
                let p = this.$route.path.split('/')
                const response = await fetch('/blog/getArticleList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: p[1],
                        param: p[2]
                    })
                })
                let list = await response.json()
                this.articles = list
                switch (p[1]) {
                    case 'type':
                        this.$emit('changeTitle', p[2].toUpperCase() + ' 类型下的文章')
                        break
                    case 'label':
                        this.$emit('changeTitle', p[2] + ' 标签下的文章')
                        break
                    case 'archive':
                        this.$emit('changeTitle', p[2] + ' 的归档文档')
                        break
                    case 'search':
                        this.$emit('changeTitle', p[2] + ' 的搜索结果')
                        break
                    default:
                        this.$emit('changeTitle', 'Welcome to Koumakan')
                }
            }
        },
        mounted() {
            this.getArticleList()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    $blue: #66ccff;
    $green: #66ffcc;

    h1 {
        color: $green;
    }

    .logo {
        width: 100px;
        height: 100px;
        a {
            text-decoration: none;
        }
    }
</style>
