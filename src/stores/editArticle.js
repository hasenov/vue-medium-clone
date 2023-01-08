import { defineStore } from "pinia";
import articleApi from "@/api/article";

export const useEditArticleStore = defineStore("editArticle", {
	state: () => {
		return {
			isSubmitting: false,
			validationErrors: null,
			isLoading: false,
			article: null,
		};
	},
	actions: {
		editArticle({ slug, articleInput }) {
			return new Promise((resolve) => {
				this.isSubmitting = true;
				articleApi
					.updateArticle(slug, articleInput)
					.then((article) => {
						this.isSubmitting = false;
						resolve(article);
					})
					.catch((res) => {
						this.isSubmitting = false;
						this.validationErrors = res.response.data.errors;
					});
			});
		},
		getArticle({ slug }) {
			this.article = null;
			return new Promise((resolve) => {
				this.isLoading = true;
				articleApi
					.fetchArticle(slug)
					.then((article) => {
						this.isLoading = false;
						this.article = article;
						resolve(article);
					})
					.catch((res) => {
						this.isLoading = false;
					});
			});
		},
	},
});
