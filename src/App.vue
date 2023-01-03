<template>
	<McvTopbar />

	<RouterView />
</template>

<script>
import McvTopbar from "@/components/Topbar.vue";
import { mapActions } from "pinia";
import { useAuthStore } from "./stores/auth";

export default {
	name: "McvApp",
	components: {
		McvTopbar,
	},
	methods: {
		...mapActions(useAuthStore, ["getCurrentUser"]),
	},
	mounted() {
		this.getCurrentUser();
	},
};
</script>
