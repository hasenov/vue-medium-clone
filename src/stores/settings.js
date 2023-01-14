import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
	state: () => {
		return {
			isSubmitting: false,
			validationErrors: null,
		};
	},
	actions: {},
});
