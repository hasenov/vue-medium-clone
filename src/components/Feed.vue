<template>
	<div class="articles-toggle">
		<ul class="nav nav-pills outline-active">
			<li class="nav-item" v-for="tab in tabs">
				<RouterLink
					:to="tab.to"
					class="nav-link"
					:class="{
						active: routeName === tab.to.name,
					}"
				>
					<i :class="tab.icon" v-if="tab.icon"></i>
					{{ tab.title }}
				</RouterLink>
			</li>
		</ul>
	</div>

	<mcv-loading v-if="isLoading" />

	<mcv-error v-if="error" />

	<div v-if="data">
		<template v-if="data.articlesCount > 0">
			<mcv-article-preview v-for="(article, index) in data.articles" :article="article" :key="index" />
			<mcv-pagination :total="data.articlesCount" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
		</template>
		<template v-else>
			<mcv-error :message="'No articles are here... yet.'" />
		</template>
	</div>
</template>

<script>
import { useFeedStore } from "@/stores/feed";
import { mapActions, mapState } from "pinia";
import { limit } from "@/helpers/vars";
import queryString from "query-string";
import McvPagination from "@/components/Pagination.vue";
import McvLoading from "@/components/Loading.vue";
import McvError from "@/components/Error.vue";
import McvArticlePreview from "@/components/ArticlePreview.vue";

export default {
	name: "McvFeed",
	components: {
		McvPagination,
		McvLoading,
		McvError,
		McvArticlePreview,
	},
	data() {
		return {
			limit,
		};
	},
	props: {
		apiUrl: {
			type: String,
			required: true,
		},
		tabs: {
			type: Array,
			required: true,
		},
	},
	methods: {
		getFeed() {
			const parsedUrl = queryString.parseUrl(this.apiUrl);
			const stringifiedParams = queryString.stringify({
				limit,
				offset: this.offset,
				...parsedUrl.query,
			});
			const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
			this.fetchFeed({
				url: apiUrlWithParams,
			});
		},
		...mapActions(useFeedStore, ["fetchFeed"]),
	},
	computed: {
		...mapState(useFeedStore, ["data", "isLoading", "error"]),
		currentPage() {
			return Number(this.$route.query.page || "1");
		},
		baseUrl() {
			return this.$route.path;
		},
		offset() {
			return this.currentPage * limit - limit;
		},
		routeName() {
			return this.$route.name;
		},
	},
	watch: {
		currentPage() {
			this.getFeed();
		},
		apiUrl() {
			this.getFeed();
		},
	},
	mounted() {
		this.getFeed(this.apiUrl);
	},
};
</script>
