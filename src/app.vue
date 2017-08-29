<template>
    <div id="app">
        <side-bar :show="sideBarIsShow" :docked="sideBarIsDocked" @close="toggleSideBar"/>
        <main id="right-part" :class="{'nav-margin': sideBarIsDocked}">
            <mu-appbar class="app-bar" :zDepth="2" :title="title">
                <mu-icon-button icon="menu" v-show="!sideBarIsDocked" slot="left" @click="toggleSideBar"/>
            </mu-appbar>
            <router-view class="content-view"/>
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
            }
        },
        mounted() {
            let that = this
            let resizeTimer = false
            function caculateSideBarMode() {
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
            }
            window.addEventListener('resize', caculateSideBarMode)
        }
    }
</script>
<style lang="scss" scope>
    $green: #66ccff;

    #app {
        background-color: $green;
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
