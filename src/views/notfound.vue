<template>
    <mu-paper class="paper">
        <p class="title">您来到了未知的领域</p>
        <p class="subtitle">Oops! That page can’t be found.</p>
        <div class="search">
            <mu-text-field v-model.trim="searchFieldValue" hintText="Search..." fullWidth @keyup.native.enter="search"/>
        </div>
    </mu-paper>
</template>

<script>
    export default {
        data() {
            return {
                searchFieldValue: ''
            }
        },
        methods: {
            search() {
                if (this.searchFieldValue == '') return
                this.$router.push('/search/' + this.searchFieldValue)
            }
        },
        mounted() {
            this.$emit('changeTitle', '404 ERROR')
        }
    }
</script>

<style lang="scss">
    .paper {
        padding: 15px;
        min-height: 500px;
        height: 100%;
        .title {
            text-align: center;
            font-size: 32px;
            margin-bottom: 0px;
        }
        .subtitle {
            text-align: center;
            font-size: 24px;
            color: gray;
            margin-top: 0px;
        }
    }
    .search {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
        padding-left: 25px;
        padding-top: 15px;
        padding-right: 25px;
        background-color: #ebebeb;
        border-radius: 25px;

        .mu-text-field-hint {
            font-size: 24px;
        }
        .mu-text-field-input {
            font-size: 24px;
        }
    }
</style>
