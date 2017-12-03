<template>
    <div class="card">
        <div class="title">
            <router-link :to="'/article/' + article.id">{{ article.title }}</router-link>
        </div>
        <div class="type">
            <md-icon>{{getIcon(article.category)}}</md-icon>
        </div>
        <div>
            {{ article.brief }}
        </div>
        <md-divider/>
        <div class="foot">
            <div class="date">
                <md-icon>date_range</md-icon>
                <span>{{ article.date }}</span>
            </div>
            <div class="labels" v-for="label in article.labels.split(',')">
                <md-icon>turned_in</md-icon>
                <router-link :to="'/label/' + label">{{ label }}</router-link>
            </div>
            <md-button label="查看全文" primary class="button" :to="'/article/' + article.id"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'articleCard',
        props: ['article'],
        methods: {
            getIcon(type) {
                if (!type) return 'help_outline'
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
