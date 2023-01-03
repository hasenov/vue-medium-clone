import { defineStore } from "pinia";
import popularTagsApi from "@/api/popularTags";

export const usePopularTagsStore = defineStore("popularTags", {
	state: () => {
		return {
			data: null,
			isLoading: false,
			error: null,
		};
	},
	actions: {
		fetchPopularTags() {
			return new Promise((resolve) => {
				this.data = null;
				this.isLoading = true;
				popularTagsApi.fetchPopularTags().then((res) => {
					this.data = res.data.tags;
					this.isLoading = false;
					resolve(res.data);
				});
			});
		},
	},
});
