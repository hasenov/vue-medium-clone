import { defineStore } from "pinia";
import feedApi from "@/api/feed";

export const useFeedStore = defineStore("feed", {
	state: () => {
		return {
			data: null,
			isLoading: false,
			error: null,
		};
	},
	actions: {
		fetchFeed({ url }) {
			return new Promise((resolve) => {
				this.isLoading = true;
				this.data = null;
				feedApi
					.fetchFeed(url)
					.then((res) => {
						this.isLoading = false;
						this.data = res.data;
						resolve(res.data);
					})
					.catch((err) => {
						this.isLoading = false;
					});
			});
		},
	},
});
