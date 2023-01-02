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
        pagination
    </div>
</div>
</template>

<script>
import { useFeedStore } from '@/stores/feed';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'McvFeed',
    props: {
        apiUrl: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions(useFeedStore, ['fetchFeed'])
    },
    computed: {
        ...mapState(useFeedStore, ['data', 'isLoading', 'error'])
    },
    mounted() {
        this.fetchFeed({
            url: this.apiUrl
        });
    }
}
</script>