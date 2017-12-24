<template>
    <div id="app">
        <md-sidenav id="main-sidebar" class="md-left md-fixed" md-swipeable ref="sidebar">
            <header>
                <img src="/static/img/avatar.jpg" alt="RemiliaForever">
                <span class="md-headline">RemiliaForever</span>
            </header>
            <nav>
                <md-list>
                    <md-list-item>
                        <router-link to="/home"><md-icon>home</md-icon><span>首页</span></router-link>
                    </md-list-item>
                    <md-divider/>
                    <md-list-item>
                        <router-link to="/category/it"><md-icon>phonelink</md-icon><span>IT技术</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/category/acg"><md-icon>games</md-icon><span>ACG见闻</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/category/daily"><md-icon>today</md-icon><span>生活琐记</span></router-link>
                    </md-list-item>
                    <md-divider/>
                    <md-list-item>
                        <md-icon>bookmark</md-icon>
                        <span>标签</span>
                        <md-list-expand>
                            <md-list>
                                <md-list-item v-for="(value, key) in labels" :key="key">
                                    <router-link :to="'/label/' + key">
                                        <span class="label">{{ key }}</span>
                                        <span class="chip">{{ value }}</span>
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
                                <md-list-item v-for="(value, key) in archive" :key="key">
                                    <router-link :to="'/archive/' + key">
                                        <span class="label">{{ key }}</span>
                                        <span class="chip">{{ value }}</span>
                                    </router-link>
                                </md-list-item>
                            </md-list>
                        </md-list-expand>
                    </md-list-item>
                    <md-divider/>
                    <md-list-item>
                        <router-link to="/friends"><md-icon>people</md-icon><span>友情链接</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/about"><md-icon>link</md-icon><span>关于</span></router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/rss"><md-icon>rss_feed</md-icon><span>RSS</span></router-link>
                    </md-list-item>
                </md-list>
            </nav>
        </md-sidenav>
        <md-whiteframe md-elevation="1">
            <md-toolbar id="main-toolbar" md-theme="white">
                <md-button class="md-icon-button toggle-button" @click="$refs.sidebar.toggle()">
                    <md-icon>menu</md-icon>
                </md-button>
                <h2 class="md-title" style="flex: 1">{{ title }}</h2>
                <md-button class="md-icon-button md-accent" @click="isFocus = true">
                    <md-spinner v-if="isLoading.router || isLoading.http" class="md-accent" md-indeterminate :md-size="24" :md-stroke="4"/>
                    <md-icon v-else class="md-raised">search</md-icon>
                </md-button>
                <md-input-container :focus="isFocus" class="search-field">
                    <md-input placeholder="Searching..." v-model.trim="searchFieldValue"
                        v-focus="isFocus" @blur="isFocus = false" @keyup.native.enter="search"/>
                </md-input-container>
            </md-toolbar>
        </md-whiteframe>
        <main>
            <div class="content-view">
                <router-view @changeTitle="changeTitle" @goto="$refs.sidebar.close()"/>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                title: 'Welcome to Koumakan',
                isLoading: {
                    http: 0,
                    router: false
                },
                searchFieldValue: '',
                isFocus: false,
                labels: {},
                archive: {}
            }
        },
        methods: {
            changeTitle(title) {
                console.log('change title:' + title)
                this.title = decodeURI(title)
                document.title = this.title
            },
            search() {
                this.isFocus = false
                if (this.searchFieldValue != '') {
                    this.$router.push('/search/' + this.searchFieldValue)
                }
            }
        },
        directives: {
            focus: {
                update: (el, {value}) => {
                    if (value) {
                        el.focus()
                    }
                }
            }
        },
        beforeMount() {
            this.$material.registerTheme('default', {
                primary: 'blue',
                accent: 'indigo',
                warn: 'orange',
                background: 'white'
            })
            this.$material.registerTheme('white', {
                primary: 'white',
                accent: 'black',
                warn: 'orange',
                background: 'white'
            })
            this.$http.interceptors.request.use(config => {
                this.isLoading.http ++
                return config
            }, err => {
                if (this.isLoading.http) {
                    this.isLoading.http --
                }
                return Promise.reject(err)
            })
            this.$http.interceptors.response.use(response => {
                if (this.isLoading.http) {
                    this.isLoading.http --
                }
                return response
            }, err => {
                if (this.isLoading.http) {
                    this.isLoading.http --
                }
                return Promise.reject(err)
            })
            this.$router.beforeEach((to, from, next) => {
                this.isLoading.router = true
                next()
            })
            this.$router.afterEach(() => {
                this.isLoading.router = false
            })
        },
        mounted() {
            this.$http.get('/labels')
                .then(res => this.labels = res.data)
            this.$http.get('/archive')
                .then(res => this.archive = res.data)
        }
    }
</script>

<style lang="scss">
    @import '~vue-material/src/core/stylesheets/variables.scss';

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
    #main-sidebar {
        .md-sidenav-content {
            width: $sidebar-size;
            height: 100%;
            overflow: hidden;
            @include desktop {
                top: 0;
                pointer-events: auto;
                transform: translate3d(0, 0, 0) !important;
                box-shadow: $material-shadow-3dp;
            }
        }
        header {
            img {
                display: block;
                height: 96px;
                width: 96px;
                border-radius: 50%;
                margin: 30px auto 20px auto;
                box-shadow: black 0 0 2px;
            }
            span {
                display: block;
                text-align: center;
                margin-bottom: 12px;
                color: #474a4f;
            }
        }
        nav {
            height: calc(100% - 178px);
            overflow-y: auto;

            .label {
                margin-left: 12px;
            }
            .chip {
                line-height: 22px;
                padding: 0 6px 0 6px;
                margin-right: 6px;
                background-color: #dcdcdc;
                border-radius: 6px;
            }

            .md-list-item-expand.md-active::before, .md-list-item-expand.md-active::after {
                background-color: rgba(0, 0, 0, 0);
            }
        }
    }
    #main-toolbar {
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
            width: 0px;
            overflow: hidden;
            transition: width .3s ease;

            &[focus] {
                width: 258px;
            }
        }
    }
    main {
        position: fixed;
        height: calc(100% - 65px);
        width: 100%;
        overflow-y: auto;
        background-color: #ebebeb;

        @include desktop {
            padding-left: $sidebar-size;
        }

        .content-view {
            transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
            padding-top: 15px;
            min-height: 100%;
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
                margin-left: auto;
                margin-right: auto;
                width: 700px;
            }
        }
        @media(min-width: 1280px) {
            .content-view {
                margin-left: auto;
                margin-right: auto;
                width: 900px;
            }
        }
        @media(min-width: 1680px) {
            .content-view {
                margin-left: auto;
                margin-right: auto;
                width: 1200px;
            }
        }
    }

    .md-whiteframe {
        background-color: #fff;
    }
</style>
