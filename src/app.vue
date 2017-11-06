<template>
    <div id="app">
        <md-sidenav class="md-left md-fixed main-sidebar" md-swipeable ref="sidebar">
            <header>
                <img src="static/img/avatar.jpg" alt="RemiliaForever">
                <span class="md-headline">RemiliaForever</span>
            </header>
            <nav>
                <md-list>
                    <md-list-item>
                        <router-link to="/home"><md-icon>home</md-icon><span>首页</span></router-link>
                        <md-divider/>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/type/it"><md-icon>phonelink</md-icon><span>IT技术</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/type/acg"><md-icon>games</md-icon><span>ACG见闻</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/type/daily"><md-icon>today</md-icon><span>生活琐记</span></router-link>
                        <md-divider/>
                    </md-list-item>
                    <md-list-item>
                        <md-icon>bookmark</md-icon>
                        <span>标签</span>
                        <md-list-expand>
                            <md-list>
                                <md-list-item>
                                    <router-link to="/label/1">
                                        <span class="left">阿达发射的法</span>
                                        <span class="right">12</span>
                                    </router-link>
                                </md-list-item>
                            </md-list>
                        </md-list-expand>
                    </md-list-item>
                    <md-list-item>
                        <md-icon>archive</md-icon>
                        <span>文章归档</span>
                        <md-list-expand>
                            <md-list>
                                <md-list-item>
                                    <router-link to="/archive/1">
                                        <span class="left">阿达发射的法</span>
                                        <span class="right">12</span>
                                    </router-link>
                                </md-list-item>
                            </md-list>
                        </md-list-expand>
                        <md-divider/>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/friends"><md-icon>people</md-icon><span>友情链接</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/about"><md-icon>link</md-icon><span>关于</span></router-link>
                    </md-list-item>
                    <md-list-item target="_black" href="/rss">
                        <md-icon>rss_feed</md-icon><span>RSS</span>
                    </md-list-item>
                </md-list>
            </nav>
        </md-sidenav>
        <md-whiteframe md-elevation="2">
            <md-toolbar class="main-toolbar">
                <md-button class="md-icon-button toggle-button" @click="$refs.sidebar.toggle()">
                    <md-icon>menu</md-icon>
                </md-button>
                <h2 class="md-title" style="flex: 1">Dense</h2>
                <md-button class="md-icon-button">
                    <md-spinner v-if="isLoading" md-indeterminate class="md-accent" :md-size="24" :md-stroke="4"/>
                    <router-link v-else to="/search" class="md-raised md-primary"><md-icon>search</md-icon></router-link>
                </md-button>
                <md-input-container class="search-field"  md-theme="green">
                    <md-input placeholder="My nice placeholder"/>
                </md-input-container>

            </md-toolbar>
        </md-whiteframe>
        <main>
            <transition name="main">
                <router-view class="content-view"/>
            </transition>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                title: 'Welcome to Koumakan',
                isLoading: false
            }
        },
        methods: {
            changeTitle(title) {
                console.log('change title:' + title)
                this.title = decodeURI(title)
                document.title = this.title
            }
        },
        mounted() {
            this.$material.registerTheme('default', {
                primary: 'green',
                accent: 'indigo',
                warn: 'orange',
                background: 'white'
            })
            this.$material.registerTheme('green', {
                primary: 'green',
                accent: 'blue',
                warn: 'orange',
                background: 'green'
            })
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/vue-material/src/core/stylesheets/variables.scss';

    $sidebar-size: 256px;
    @mixin desktop {
        @media (min-width: 980px) {
            @content
        }
    }

    #app {
        width: 100%;
        height: 100%;
    }
    .main-sidebar {
        .md-sidenav-content {
            width: $sidebar-size;
            display: flex;
            flex-flow: column;
            overflow: hidden;
            @include desktop {
                top: 0;
                pointer-events: auto;
                transform: translate3d(0, 0, 0) !important;
                box-shadow: $material-shadow-2dp;
            }
        }
        header {
            img {
                display: block;
                height: 96px;
                width: 96px;
                border-radius: 50%;
                margin: 30px auto 20px auto;
            }
            span {
                display: block;
                text-align: center;
                margin-bottom: 12px;
            }
        }
        nav {
            overflow-y: auto;
            flex: 1;

            .left {
                margin-left: 12px;
            }
            .right {
                line-height: 22px;
                padding: 0 6px 0 6px;
                margin-right: 6px;
                background-color: #dcdcdc;
                border-radius: 6px;
            }
        }
    }
    .main-toolbar {
        background-color: #fff !important;
        color: #000 !important;
        @include desktop {
            margin-left: $sidebar-size;
            padding-left: 20px;
        }
        .toggle-button {
            @include desktop {
                display: none;
            }
        }
        .search-field {
            width: 258px;
        }
    }
    main {
        position: fixed;
        height: 100%;
        width: 100%;
        overflow-y: auto;
        padding-top: 6px;

        @include desktop {
            padding-left: $sidebar-size;
        }

        .content-view {
            transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
            background-color: #fefefe;
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
</style>
