<template>
    <router-view/>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                title: 'Welcome to Koumakan'
            }
        },
        components: {},
        methods: {
            changeTitle(title) {
                console.log('change title:' + title)
                this.title = decodeURI(title)
                document.title = this.title
            }
        },
        mounted() {}
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
        flex: 1;
    }
</style>
