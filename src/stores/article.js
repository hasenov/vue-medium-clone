import { defineStore } from "pinia";
import articleApi from "@/api/article";

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
	},
});
