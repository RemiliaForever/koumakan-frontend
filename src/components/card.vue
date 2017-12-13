<template>
    <md-whiteframe md-elevation="3" class="card">
        <div class="title">
            <router-link :to="'/article/' + article.id">{{ article.title }}</router-link>
        </div>
        <div class="category">
            <md-icon>{{getIcon(article.category)}}</md-icon>
        </div>
        <div class="content">
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
            <md-button class="md-primary button" @click="$router.push('/article/' + article.id)">
                查看全文
            </md-button>
        </div>
    </md-whiteframe>
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
        background-color: #ffffff;
        margin-top: 25px;
        a:hover {
            text-decoration: none;
        }
    }
    .title {
        padding: 16px;
        a {
            color: #373a3f;
            font-size: 24px;
            &:hover {
                color: #373a3f;
            }
        }
    }
    .category {
        position: absolute;
        right: 16px;
        top: 16px;
    }
    .content {
        padding: 5px 15px;
    }
    .foot {
        text-align: center;
        line-height: 36px;
        .date, .labels {
            display: inline;
            float: left;
            height: 36px;
            color: gray;
            a {
                color: gray;
            }
        }
        .date {
            margin: 0 10px;
        }
        .labels {
            margin-right: 5px;
        }

        .button {
            display: inline;
            float: right;
            min-height: 30px;
            height: 30px;
            line-height: 30px;
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
