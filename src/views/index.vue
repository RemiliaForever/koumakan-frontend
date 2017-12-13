<template>
    <div v-if="articles.length>0">
        <div style="margin-top:-24px"/>
        <article-card v-for="article in articles" :article="article" :key="article.date"/>
    </div>
    <div v-else>
        <mu-paper style="padding:25px;">
            <p style="font-size: 26px; text-align: center">
                未找到相关文章。
            </p>
        </mu-paper>
    </div>
</template>

<script>
    import articleCard from '../components/card.vue'
    export default {
        data() {
            return {
                articles: [{
                    title: '载入中...',
                    brief: '',
                    content: '',
                    category: 'unknown',
                    labels: '',
                    date: '0000-00-00 00:00:00'
                }],
                pagesize: null,
                offset: null
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
            getArticleList() {
                let value = this.$route.params.value
                let filter = this.$route.name
                if (filter === 'home') {
                    this.$emit('changeTitle', 'Welcome to Koumakan')
                } else {
                    switch (filter) {
                        case 'category':
                            this.$emit('changeTitle', value.toUpperCase() + ' 类型下的文章')
                            break
                        case 'label':
                            this.$emit('changeTitle', value + ' 标签下的文章')
                            break
                        case 'archive':
                            this.$emit('changeTitle', value + ' 的归档文档')
                            break
                        case 'search':
                            this.$emit('changeTitle', value + ' 的搜索结果')
                            break
                        default:
                            this.$router.push('/notfound')
                    }
                }
                this.offset = 0
                this.$http.get('articles', {
                    filter: this.$route.params.filter,
                    value: this.$route.params.value,
                    pagesize: this.pagesize,
                    offset: this.offset
                }).then(res => this.articles = res.data)
            },
            getMoreArticle() {
                this.offset += this.pagesize
                this.$http.get('/articles', {
                    filter: this.$route.params.filter,
                    value: this.$route.params.value,
                    pagesize: this.pagesize,
                    offset: this.offset
                }).then(res => this.articles.concat(res.data))
            }
        },
        mounted() {
            this.getArticleList()
        }
    }
</script>

<style lang="css" scoped>
</style>
