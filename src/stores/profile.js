import { defineStore } from "pinia";
import profileApi from "@/api/profile";

export const useProfileStore = defineStore("profile", {
	state: () => {
		return {
			data: null,
			isLoading: false,
			error: null,
		};
	},
	actions: {
		fetchProfile({ slug }) {
			return new Promise((resolve, reject) => {
				this.data = null;
				this.isLoading = true;
				profileApi.fetchProfile(slug).then((profile) => {
					this.data = profile;
					this.isLoading = false;
					resolve(profile);
				});
			});
		},
	},
});
