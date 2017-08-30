<template>
    <nav>
        <mu-drawer :class="{sidebar:true}"  :width="256" :zDepth="1" :open="show" :docked="docked" @close="close">
            <mu-list>
                <mu-list-item disabled>
                    <mu-paper circle :class="{'avatar': true}">
                        <mu-avatar :size="96" src="/static/images/avatar.jpg" alt="RemiliaForever"/>
                    </mu-paper>
                    <p class="nick">RemiliaForever</p>
                </mu-list-item>
                <br>
                <mu-list-item title="首页" to="/">
                    <mu-icon slot="left" value="home"/>
                </mu-list-item>
                <mu-divider/>
                <mu-list-item title="IT技术" to="/type/it">
                    <mu-icon slot="left" value="phonelink"/>
                </mu-list-item>
                <mu-list-item title="ACG见闻" to="/type/acg">
                    <mu-icon slot="left" value="games"/>
                </mu-list-item>
                <mu-list-item title="生活琐记" to="/type/daily">
                    <mu-icon slot="left" value="today"/>
                </mu-list-item>
                <mu-divider/>
                <mu-list-item title="标签" toggleNested :open="false">
                    <mu-icon slot="left" value="bookmark"/>
                    <mu-list-item v-for="l in label" :key="l.name" :title="l.name" :to="'/label/'+l.name" slot="nested">
                        <mu-badge :content="l.count" slot="after"/>
                    </mu-list-item>
                </mu-list-item>
                <mu-list-item title="文章归档" toggleNested :open="false">
                    <mu-icon slot="left" value="archive"/>
                    <mu-list-item v-for="a in archive" :key="a.name" :title="a.name" :to="'/archive/'+a.name" slot="nested">
                        <mu-badge :content="a.count" slot="after"/>
                    </mu-list-item>
                </mu-list-item>
                <mu-divider/>
                <mu-list-item title="友情链接" to="/article/friends">
                    <mu-icon slot="left" value="people"/>
                </mu-list-item>
                <mu-list-item title="关于" to="/article/about">
                    <mu-icon slot="left" value="link"/>
                </mu-list-item>
                <mu-list-item title="RSS" to="/rss">
                    <mu-icon slot="left" value="rss_feed"/>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </nav>
</template>

<script>
    export default {
        name: 'sidebar',
        props: ['show', 'docked'],
        methods: {
            close() {
                this.$emit('close')
            }
        },
        data() {
            return {
                archive: null,
                label: null
            }
        },
        async mounted() {
            let res = await fetch('/blog/getArchive')
            this.archive = await res.json()
            res = await fetch('/blog/getAllLabel')
            this.label = await res.json()
        }
    }
</script>

<style lang="scss" scoped>
    .listpadding {
        padding-left: 30px;
    }
    .avatar {
        width: 96px;
        height: 96px;
        margin: 0 auto;
    }
    .nick {
        text-align: center;
        font-size: 24px;
        margin-bottom: 0;
    }
    .chip-container {
        display: flex;
        padding-top: 5px;
        flex-wrap: wrap;
        align-items: stretch;

        div {
            margin: 1px;
        }
    }
</style>
