<template>
    <div id="articleList" v-if="articles.length>0">
        <article-card v-for="article in articles" :article="article" :key="article.date"/>
    </div>
    <div v-else>
        Not Article Found
    </div>
</template>

<script>
    import articleCard from '../components/card.vue'
    export default {
        data() {
            return {
                articles: [{title:'载入中...'}],
                offset: 0
            }
        },
        components: {
            articleCard
        },
        watch: {
            '$route'(to, from) {
                this.getArticleList()
            }
        },
        methods: {
            async getArticleList() {
                let p = this.$route.path.split('/')
                const response = await fetch('/api/getArticleList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        typestring: p[1],
                        param: p[2],
                        offset: this.offset
                    })
                })
                this.articles = await response.json()
                this.offset = 0
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
            },
            async getMoreArticle() {
                let p = this.$route.path.split('/')
                this.offset += 1
                const response = await fetch('/api/getArticleList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        typestring: p[1],
                        param: p[2],
                        offset: this.offset
                    })
                })
                this.articles = this.articles.concat(await response.json())
            }
        },
        mounted() {
            this.getArticleList()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
    #articleList {
        position: relative;
    }
</style>
