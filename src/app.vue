<template>
    <div id="app">
        <mu-appbar title="Title" fullWidth>
            <mu-icon-button  icon="arrow_back" @click="back" slot="left"/>
        </mu-appbar>
        <router-view></router-view>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    html {
        margin: 0px;
        height: 100%;
    }

    body {
        margin: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #app {
        color: #2c3e50;
        max-width: 600px;
        text-align: center;

        a {
            text-decoration: none;
        }
    }
</style>
