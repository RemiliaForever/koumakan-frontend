<template>
    <div id="app">
        <side-bar :show="sideBarIsShow" :docked="sideBarIsDocked" @close="toggleSideBar" @err="handleError"/>
        <mu-appbar :title="title" class="right-part"
            :class="{'nav-margin': sideBarIsDocked}">
            <mu-icon-button icon="menu" v-show="!sideBarIsDocked" slot="left" @click="toggleSideBar"/>
        </mu-appbar>
        <router-view class="right-part" :class="{'nav-margin': sideBarIsDocked}"/>
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
                title: 'Welcom to Koumakan',
                err: {status: 200, message: 'No Error Happened!'}
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
            handleError(err) {
                this.err = err
                this.$router.push({path: '/error'})
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

        .right-part {
            transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
            -webkit-transition: margin .45s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .nav-margin {
            margin-left: 256px;
        }
    }
</style>
