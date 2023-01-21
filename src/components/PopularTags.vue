<template>
	<div class="sidebar">
		<p>Popular Tags</p>

		<div class="tag-list" v-if="data">
			<RouterLink :to="{ name: 'tag', params: { slug: tag } }" class="tag-default tag-pill" v-for="tag in data" :key="tag">{{ tag }}</RouterLink>
		</div>

		<mcv-loading v-if="isLoading" />

		<mcv-error v-if="error" />
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { usePopularTagsStore } from "../stores/popularTags";
import McvLoading from "@/components/Loading.vue";
import McvError from "@/components/Error.vue";

export default {
	name: "McvPopularTags",
	components: {
		McvLoading,
		McvError,
	},
	methods: {
		...mapActions(usePopularTagsStore, ["fetchPopularTags"]),
	},
	computed: {
		...mapState(usePopularTagsStore, ["data", "isLoading", "error"]),
	},
	mounted() {
		this.fetchPopularTags();
	},
};
</script>
