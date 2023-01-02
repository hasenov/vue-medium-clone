<template>
<div>
    <div v-if="isLoading">Loading...</div>

    <div v-if="error">Error</div>

    <div v-if="data">
        <div class="article-preview" v-for="(article, index) in data.articles" :key="index">
            <div class="article-meta">
                <RouterLink :to="{
                    name: 'userProfile', 
                    params: {slug: article.author.username}
                }">
                    <img :src="article.author.image" :alt="article.author.username">
                </RouterLink>
                <div class="info">
                    <RouterLink :to="{
                        name: 'userProfile',
                        params: {slug: article.author.username}
                    }" class="author">
                        {{ article.author.username }}
                    </RouterLink>
                    <span class="date">{{ article.createdAt }}</span>
                </div>
                <div class="pull-xs-right">
                    Addd to favorites
                </div>
            </div>
            <RouterLink :to="{
                name: 'article',
                params: {slug: article.slug}
            }" class="preview-link">
                <h2>{{ article.title }}</h2>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
                TAG LIST
            </RouterLink>
        </div>
        <McvPagination :total="data.articlesCount" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>
</div>
</template>

<script>
import { useFeedStore } from '@/stores/feed';
import { mapActions, mapState } from 'pinia';
import McvPagination from '@/components/Pagination.vue';
import { limit } from '@/helpers/vars';
import queryString from 'query-string';

export default {
    name: 'McvFeed',
    components: {
        McvPagination
    },
    data() {
        return {
            limit,
        }
    },
    props: {
        apiUrl: {
            type: String,
            required: true
        }
    },
    methods: {
        getFeed() {
            const parsedUrl = queryString.parseUrl(this.apiUrl);
            const stringifiedParams = queryString.stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            });
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
            this.fetchFeed({
                url: apiUrlWithParams
            });
        },
        ...mapActions(useFeedStore, ['fetchFeed']),
    },
    computed: {
        ...mapState(useFeedStore, ['data', 'isLoading', 'error']),
        currentPage() {
            return Number(this.$route.query.page || '1');
        },
        baseUrl() {
            return this.$route.path;
        },
        offset() {
            return this.currentPage * limit - limit;
        }
    },
    watch: {
        currentPage() {
            this.getFeed();
        }
    },
    mounted() {
        this.getFeed();
    }
}
</script>