<template>
    <div id="app">
        <side-bar :show="sideBarIsShow" :docked="sideBarIsDocked" @close="toggleSideBar"/>
        <main id="right-part" :class="{'nav-margin': sideBarIsDocked}">
            <mu-appbar class="app-bar" :zDepth="2" :title="title">
                <mu-icon-button icon="menu" v-show="!sideBarIsDocked" slot="left" @click="toggleSideBar"/>
            </mu-appbar>
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

        #right-part {
            transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);

            .app-bar {
                position: fixed;
            }

            .content-view {
                width: 100%;
                height: 100%;
            }
        }

        .nav-margin {
            margin-left: 256px;
        }
    }
</style>
