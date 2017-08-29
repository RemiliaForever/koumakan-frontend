<template>
    <mu-card>
        <mu-card-title title="Content Title" subTitle="Content Title"/>
        <mu-card-text>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
            调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
            似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
            找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            {{ content }}
        </mu-card-text>
        <mu-card-actions>
            <mu-flat-button label="Action 1"/>
            <mu-flat-button label="Action 2"/>
        </mu-card-actions>
    </mu-card>
</template>

<script>
    export default {
        data() {
            return {
                content: 'Loading...'
            }
        },
        methods: {
            async getContent() {
                const response = await fetch('/api/hello')
                this.content = await response.text()
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
