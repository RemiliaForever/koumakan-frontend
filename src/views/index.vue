<template>
    <div v-if="articles.length>0">
        <div style="margin-top:-24px"/>
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
                articles: [{
                    title: '载入中...',
                    brief: '',
                    content: '',
                    type: 'unknown',
                    labels: '',
                    date: '0000-00-00 00:00:00'
                }],
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
                this.offset = 0
                this.articles = await this.post('/api/getArticleList', {
                    typestring: this.$route.params.typestring,
                    param: this.$route.params.param,
                    offset: this.offset
                })
                let param = this.$route.params.param
                switch (param) {
                    case 'type':
                        this.$emit('changeTitle', param.toUpperCase() + ' 类型下的文章')
                        break
                    case 'label':
                        this.$emit('changeTitle', param + ' 标签下的文章')
                        break
                    case 'archive':
                        this.$emit('changeTitle', param + ' 的归档文档')
                        break
                    case 'search':
                        this.$emit('changeTitle', param + ' 的搜索结果')
                        break
                    default:
                        // this.$router.push('/notfound')
                }
            },
            async getMoreArticle() {
                this.offset += 1
                this.articles = this.articles.concat(await post('/api/getArticleList', {
                    typestring: this.$route.params.typestring,
                    param: this.$route.params.param,
                    offset: this.offset
                }))
            }
        },
        mounted() {
            this.getArticleList()
        }
    }
</script>

<style lang="css" scoped>
</style>
