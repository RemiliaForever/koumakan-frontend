<template>
    <div>
        article
    </div>
</template>

<script>
    export default {
        data() {
            return {
                article: {
                    title: '载入中'
                },
                comment: []
            }
        },
        watch: {
            '$route'(to, from) {
                this.getData()
            }
        },
        methods: {
            async getData() {
                let id = this.$route.path.split('/')[2]
                this.$emit('changeTitle', '载入中...')
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


