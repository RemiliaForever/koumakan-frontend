<template>
    <md-whiteframe md-elevation="3" class="paper">
        <div v-if="!isLogin">
            <p class="title">您来到了未知的领域</p>
            <p class="subtitle">Oops! That page can’t be found.</p>
            <div class="search">
                <md-input-container md-inline>
                    <label>Searching...</label>
                    <md-input v-model.strim="searchFieldValue" @keyup.native.enter="search"></md-input>
                </md-input-container>
            </div>
        </div>
        <div v-else>

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
                searchFieldValue: '',
                isLogin: false
            }
        },
        methods: {
            search() {
            }
        },
        mounted() {
            this.$emit('changeTitle', '404 ERROR')
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
        .subtitle {
            text-align: center;
            font-size: 24px;
            color: gray;
            margin-top: 0px;
        }
    }
    .search {
        width: 70%;
        margin: 100px auto;
        padding: 1px 30px;
        background-color: #ebebeb;
        border-radius: 35px;
    }
</style>
