import { defineStore } from "pinia";
import articleApi from "@/api/article";

export const useCreateArticleStore = defineStore("createArticle", {
	state: () => {
		return {
			isSubmitting: false,
			validationErrors: null,
		};
	},
	actions: {
		createArticle({ articleInput }) {
			return new Promise((resolve) => {
				this.isSubmitting = true;
				articleApi
					.createArticle(articleInput)
					.then((article) => {
						this.isSubmitting = true;
						resolve(article);
					})
					.catch((res) => {
						this.isSubmitting = false;
						this.validationErrors = res.response.data.errors;
					});
			});
		},
	},
});
