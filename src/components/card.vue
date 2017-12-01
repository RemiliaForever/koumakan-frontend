<template>
    <mu-card class="card">
        <div class="title">
            <router-link :to="'/article/' + article.id">{{ article.title }}</router-link>
        </div>
        <div class="type">
            <mu-icon :value="getIcon(article.typestring)"/>
        </div>
        <mu-card-text>
            {{ article.brief }}
        </mu-card-text>
        <mu-divider/>
        <mu-card-actions class="foot">
            <div class="date">
                <mu-icon value="date_range"/>
                <span>{{ article.date }}</span>
            </div>
            <div class="labels" v-for="label in article.labels.split(',')">
                <mu-icon value="turned_in"/>
                <router-link :to="'/label/' + label">{{ label }}</router-link>
            </div>
            <mu-flat-button label="查看全文" primary class="button" :to="'/article/' + article.id"/>
        </mu-card-actions>
    </mu-card>
</template>

<script>
    export default {
        name: 'articleCard',
        props: ['article'],
        methods: {
            getIcon(type) {
                switch (type.toUpperCase()) {
                    case 'IT': return 'phonelink'
                    case 'ACG': return 'games'
                    case 'DAILY': return 'today'
                    default: return 'help_outline'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        margin-top: 25px;
    }
    .title {
        padding: 16px;
        a {
            color: #373a3f;
            font-size: 24px;
        }
    }
    .type {
        position: absolute;
        right: 16px;
        top: 16px;
    }
    .foot {
        text-align: center;
        i {
            position: relative;
            top: 6px;
            left: 4px;
        }
        .date, .labels {
            display: inline;
            float: left;
            height: 36px;
            line-height: 36px;
            color: gray;
            a {
                color: gray;
            }
        }
        .date {
            margin-right: 10px;
        }

        .button {
            display: inline;
            float: right;
        }

        &:after {
            content: "clear float";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }
</style>
