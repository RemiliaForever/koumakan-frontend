<template>
    <div class="hello">
        <c-title :text="title"></c-title>
        <img class="logo" src="../assets/images/logo.png">
        <p class="welcome">{{ message }}</p>
        <div v-html="content"></div>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import cTitle from 'components/title'

export default {
    data () {
        return {
            title: 'Hello Vue!',
            content: '',
            message: ''
        }
    },
    methods: {
        async getContent () {
            const response = await fetch('/api/hello')
            this.content = await response.text()
            this.message = window.__lendApp__.$store.state.message
        }
    },
    mounted () {
        this.$store.commit('message', '使用 vue！')
        this.getContent()
    },

    components: {cTitle}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
$blue: #66ccff;
$green: #66ffcc;

h1 {
    color: $green;
}

.logo {
    width: 100px;
    height: 100px;
    a {
        color: #42b983;
        text-decoration: none;
    }
}
</style>
