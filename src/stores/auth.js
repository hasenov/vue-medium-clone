import { defineStore } from "pinia";
import authApi from "@/api/auth";
import { setItem, removeItem } from "@/helpers/persistanceStorage";
import { useSettingsStore } from "./settings";

export const useAuthStore = defineStore("auth", {
	state: () => {
		return {
			currentUser: null,
			isLoggedIn: null,
			isSubmitting: false,
			isLoading: false,
			validationErrors: null,
		};
	},
	getters: {
		isLoggedInBoolean: (state) => {
			return Boolean(state.isLoggedIn);
		},
		isAnonymous: (state) => {
			return state.isLoggedIn === false;
		},
	},
	actions: {
		register(credentials) {
			return new Promise((resolve, reject) => {
				this.isSubmitting = true;
				this.validationErrors = null;
				authApi
					.register(credentials)
					.then((res) => {
						this.isSubmitting = false;
						this.currentUser = res.data.user;
						this.isLoggedIn = true;
						resolve(res.data.user);
						setItem("accessToken", res.data.user.token);
					})
					.catch((res) => {
						this.validationErrors = res.response.data.errors;
						this.isSubmitting = false;
					});
			});
		},

		login(credentials) {
			return new Promise((resolve, reject) => {
				this.isSubmitting = true;
				this.validationErrors = null;
				authApi
					.login(credentials)
					.then((res) => {
						this.isSubmitting = false;
						this.currentUser = res.data.user;
						this.isLoggedIn = true;
						resolve(res.data.user);
						setItem("accessToken", res.data.user.token);
					})
					.catch((res) => {
						this.validationErrors = res.response.data.errors;
						this.isSubmitting = false;
					});
			});
		},

		getCurrentUser() {
			return new Promise((resolve, reject) => {
				this.isLoading = true;
				authApi
					.getCurrentUser()
					.then((res) => {
						this.isLoading = false;
						this.currentUser = res.data.user;
						this.isLoggedIn = true;
						resolve(res.data.user);
					})
					.catch(() => {
						this.isLoading = false;
						this.isLoggedIn = false;
						this.currentUser = null;
					});
			});
		},

		updateCurrentUser({ currentUserInput }) {
			const settings = useSettingsStore();
			return new Promise((resolve, reject) => {
				settings.isSubmitting = true;
				settings.validationErrors = null;
				authApi
					.updateCurrentUser(currentUserInput)
					.then((user) => {
						settings.isSubmitting = false;
						this.currentUser = user;
						resolve(user);
						setItem("accessToken", user.token);
					})
					.catch((result) => {
						settings.isSubmitting = false;
						settings.validationErrors = result.response.data.errors;
					});
			});
		},

		logout() {
			return new Promise((resolve, reject) => {
				this.currentUser = null;
				this.isLoggedIn = false;
				removeItem("accessToken");
				resolve();
			});
		},
	},
});
