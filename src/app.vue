<template>
    <div id="app">
        <side-bar :show="sideBarIsShow" :docked="sideBarIsDocked" @close="toggleSideBar"/>
        <mu-appbar class="app-bar" :class="{'app-bar-margin': sideBarIsDocked}" :title="title">
            <mu-icon-button icon="menu" v-show="!sideBarIsDocked" slot="left" @click="toggleSideBar"/>
            <mu-icon-button icon="search" slot="right" @click="toggleSearchFiled"/>
            <mu-text-field slot="right" class="search-filed" :style="{'width': searchFiledIsShow?'196px':'0px'}"
                @blur="toggleSearchFiled" @change="search"/>
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
                searchFiledIsShow: false,
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
                this.title = decodeURI(title)
                document.title = this.title
                if (!this.sideBarIsDocked) {
                    this.sideBarIsShow = false
                }
            },
            toggleSearchFiled() {
                this.searchFiledIsShow = !this.searchFiledIsShow
                if (this.searchFiledIsShow) {
                    document.getElementsByClassName('search-filed')[0]
                        .getElementsByTagName('input')[0]
                        .focus()
                }
            },
            search(event, value) {
                document.getElementsByClassName('search-filed')[0]
                    .getElementsByTagName('input')[0]
                    .blur()
                this.$router.push('/search/' + value)
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
    #app {
        width: 100%;
        height: 100%;


        .app-bar {
            transition: padding .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: padding .45s cubic-bezier(0.23, 1, 0.32, 1);
            background-color: #fafafa;
            color: #474a4f;
            position: fixed;
        }

        main {
            transition: padding .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: padding .45s cubic-bezier(0.23, 1, 0.32, 1);
            min-height: 100%;
            padding-top: 76px;
            background-color: #ebebeb;
        }

        .content-view {
            transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media(max-width: 980px) {
            .content-view {
                margin-left: 12px;
                margin-right: 12px;
                width: auto;
            }
        }
        @media(min-width: 980px) {
            .content-view {
                margin: auto;
                width: 700px;
            }
        }
        @media(min-width: 1280px) {
            .content-view {
                margin: auto;
                width: 900px;
            }
        }
        @media(min-width: 1680px) {
            .content-view {
                margin: auto;
                width: 1200px;
            }
        }

    }
    .app-bar-margin {
        padding-left: 278px;
    }
    .main-margin {
        padding-left: 256px;
    }
    .search-filed {
        transition: width .45s cubic-bezier(0.23, 1, 0.32, 1);
        -webkit-transition: width .45s cubic-bezier(0.23, 1, 0.32, 1);
        margin-bottom: 0px;
        width: 10px;
    }

</style>
