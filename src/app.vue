<template>
    <div id="app">
        <side-bar :show="sideBarIsShow" :docked="sideBarIsDocked" @close="toggleSideBar"/>
        <mu-appbar class="app-bar" :class="{'app-bar-margin': sideBarIsDocked}" :title="title">
            <mu-icon-button icon="menu" v-show="!sideBarIsDocked" slot="left" @click="toggleSideBar"/>
            <mu-text-field icon="search" slot="right"/>
        </mu-appbar>
        <main :class="{'main-margin': sideBarIsDocked}">
            <router-view class="content-view" @changeTitle="changeTitle"/>
        </main>
    </div>
</template>

<script>
    import SideBar from './components/sidebar.vue'
    export default {
        name: 'app',
        data() {
            return {
                sideBarIsShow: document.body.clientWidth > 980,
                sideBarIsDocked: document.body.clientWidth > 980,
                title: 'Welcome to Koumakan'
            }
        },
        components: {
            SideBar
        },
        methods: {
            toggleSideBar() {
                if (!this.sideBarIsDocked) {
                    this.sideBarIsShow = !this.sideBarIsShow
                } else {
                    this.sideBarIsShow = true
                }
            },
            changeTitle(title) {
                this.title = title
                document.title = title
                if (!this.sideBarIsDocked) {
                    this.sideBarIsShow = false
                }
            }
        },
        mounted() {
            let that = this
            let resizeTimer = false
            window.addEventListener('resize', () => {
                if (!resizeTimer) {
                    resizeTimer = true
                    setTimeout(() => {
                        if (document.body.clientWidth < 980) {
                            if (that.sideBarIsDocked) {
                                that.sideBarIsShow = false
                            }
                            that.sideBarIsDocked = false
                        } else {
                            that.sideBarIsShow =true
                            that.sideBarIsDocked = true
                        }
                        resizeTimer = false
                    }, 400)
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    $green: #66ccff;

    #app {
        width: 100%;
        height: 100%;


        .app-bar {
            transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
            background-color: #ffffff;
            color: #474a4f;
            position: fixed;
        }

        main {
            transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
            padding: 72px auto 0px auto;
            background-color: #ebebeb;
        }

        @media(min-width: 980px) {
            .content-view {
                margin-left: 3px;
                margin-right: 3px;
                width: auto;
            }
        }

        @media(min-width: 1168px) {
            .content-view {
                margin: auto;
                width: 800px;
            }
        }

        .app-bar-margin {
            padding-left: 265px;
        }
        .main-margin {
            padding-left: 256px;
        }
    }
</style>
