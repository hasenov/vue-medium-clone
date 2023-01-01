import { defineStore } from 'pinia'
import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage';

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			currentUser: null,
			isLoggedIn: null,
			isSubmitting: false,
			validationErrors: null,
		}
	},
	actions: {
		register(credentials) {
			return new Promise((resolve, reject) => {
				this.isSubmitting = true;
				this.validationErrors = null;
				authApi.register(credentials)
					.then((res) => {
						this.isSubmitting = false;
						this.currentUser = res.data.user;
						this.isLoggedIn = true;
						resolve(res.data.user);
						setItem('accessToken', res.data.user.token);
					})
					.catch((res) => {
						this.validationErrors = res.response.data.errors;
						this.isSubmitting = false;
					})
			});
		},

		login(credentials) {
			return new Promise((resolve, reject) => {
				this.isSubmitting = true;
				this.validationErrors = null;
				authApi.login(credentials)
					.then((res) => {
						this.isSubmitting = false;
						this.currentUser = res.data.user;
						this.isLoggedIn = true;
						resolve(res.data.user);
						setItem('accessToken', res.data.user.token);
					})
					.catch((res) => {
						this.validationErrors = res.response.data.errors;
						this.isSubmitting = false;
					})
			});
		},
	},
});