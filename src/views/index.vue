<template>
    <div>
        <mu-card v-for="item in items" :key="item.content">
            <mu-card-title title="Content Title" subTitle="Content Title"/>
            <mu-card-text>
                散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                {{ item.content }}
            </mu-card-text>
            <mu-card-actions>
                <mu-flat-button label="Action 1" @click="open"/>
                <mu-flat-button label="Action 2"/>
            </mu-card-actions>
        </mu-card>
        <mu-dialog :open="dialog" title="Dialog" @close="close">
            这是一个简单的弹出框
            <mu-flat-button slot="actions" @click="open" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="close" label="确定"/>
        </mu-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {content: '2Loading...'},
                    {content: '3Loading......'},
                    {content: '1Loading.........'},
                    {content: '5Loading............'},
                    {content: '0Loading...............'},
                    {content: '4Loading..................'}
                ],
                dialog: false
            }
        },
        methods: {
            async getContent() {
                const response = await fetch('/api/hello')
                this.content = await response.text()
            },
            open() {
                this.dialog = true;
            },
            close() {
                this.dialog = false;
            }
        },
        mounted() {
            document.title = '使用 vue！'
            this.getContent()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    $blue: #66ccff;
    $green: #66ffcc;

    h1 {
        color: $green;
    }

    .logo {
        width: 100px;
        height: 100px;
        a {
            text-decoration: none;
        }
    }
</style>
