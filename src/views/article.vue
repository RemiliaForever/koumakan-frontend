<template>
    <div>
        article
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        watch: {
            '$route'(to, from) {
                this.getArticle()
            }
        },
        methods: {
            getArticle() {
                this.articles = 'asdf'
            }
        },
        mounted() {
            this.getArticle()
        }
    }
</script>


