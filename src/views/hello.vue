<template>
    <div>
        <mu-appbar title="Title">
            <mu-icon-button icon='menu' slot="left"/>
            <mu-icon-button icon='expand_more' slot="right"/>
        </mu-appbar>
        <br>

        <mu-appbar title="Title">
            <mu-icon-button icon="close" slot="left"/>
            <mu-icon-menu icon="more_vert" slot="right">
                <mu-menu-item title="菜单 1"/>
                <mu-menu-item title="菜单 2"/>
                <mu-menu-item title="菜单 3"/>
                <mu-menu-item title="菜单 4"/>
                <mu-menu-item title="菜单 5"/>
            </mu-icon-menu>
        </mu-appbar>
        <br>

        <mu-appbar title="Title">
            <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
            <mu-flat-button color="white" label="flat Button" slot="right"/>
        </mu-appbar>
    </div>
</template>

<script>

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
            text-decoration: none;
        }
    }
</style>
