<template>
    <div class="sidebar">
        <mu-drawer :width="256" :open="show" :docked="docked" @close="close">
            <mu-list>
                <mu-list-item title="Menu Item One" @click="gen_500"/>
                <mu-list-item title="Close" @click="close"/>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
    export default {
        name: 'sidebar',
        props: ['show', 'docked'],
        methods: {
            close() {
                this.$emit('close')
            },
            gen_500() {
                fetch('/asdfas')
                    .then(response => {
                        if (response.ok) {
                            response.text()
                        } else {
                            this.$emit('err', response.text())
                        }
                    })
                    .catch(e => console.log(e + 'asd'))
            }

        }
    }
</script>
