<template>
    <mu-card>
        <mu-card-title title="Content Title" subTitle="Content Title"/>
        <mu-card-text>
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
                content: this.err
            }
        },
        mounted() {
            this.$emit('changeTitle', '404 ERROR')
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
