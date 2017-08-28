<template>
    <div id="app">
        <mu-appbar title="Title" class="example-appbar" :class="{'nav-hide': !open}">
            <mu-icon-button icon="menu" slot="left" @click="toggle()" />
        </mu-appbar>
        <div class="example-content" :class="{'nav-hide': !open}">
            <img src="./assets/images/logo.png">
            <hello></hello>
        </div>

    </div>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {
            open: true,
            msg: 'text'
        }
    },
    components: {
    },
    methods: {
        toggle () {
            console.log(this.msg)
            this.open = !this.open
        }
    }
}
</script>
<style lang="scss">
$green: #66ccff;

#app {
    background-color: $green;
}
</style>
