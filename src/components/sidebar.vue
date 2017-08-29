<template>
    <nav class="sidebar">
        <mu-drawer :width="256" :zDepth="2" :open="show" :docked="docked" @close="close">
            <mu-list>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Close" @click="close"/>
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
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        -webkit-overflow-scrolling: touch;
    }
</style>
