import { defineStore } from "pinia";
import articleApi from "@/api/article";
import { useFeedStore } from "./feed";

export const useArticleStore = defineStore("article", {
	state: () => {
		return {
			data: null,
			isLoading: false,
			error: null,
		};
	},
	actions: {
		fetchArticle({ slug }) {
			return new Promise((resolve) => {
				this.data = null;
				this.isLoading = true;
				articleApi.fetchArticle(slug).then((article) => {
					this.data = article;
					this.isLoading = false;
					resolve(article);
				});
			});
		},
		deleteArticle({ slug }) {
			return new Promise((resolve) => {
				articleApi.deleteArticle(slug).then(() => {
					this.data = null;
					resolve();
				});
			});
		},
		favoriteArticle({ slug, isFavorited }) {
			return new Promise((resolve) => {
				const feed = useFeedStore();
				const promise = isFavorited ? articleApi.unFavoriteArticle(slug) : articleApi.favoriteArticle(slug);
				promise.then((article) => {
					this.data = article;
					if (feed.data) {
						feed.data.articles = feed.data.articles.map((item) => {
							if (item.slug === slug) {
								return article;
							}
							return item;
						});
					}
					resolve(article);
				});
			});
		},
	},
});
