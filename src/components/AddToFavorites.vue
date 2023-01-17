<template>
	<button
		class="btn btn-sm"
		:class="{
			disabled: isSubmitting,
			'btn-outline-primary': !isFavorited,
			'btn-primary': isFavorited,
		}"
		@click="onClick"
	>
		<template v-if="isWithTitle">
			<i class="ion-heart"></i> <span>{{ isFavorited ? "Unfavorite Article" : "Favorite Article" }}</span> <span class="counter">({{ favoritesCount }})</span>
		</template>

		<template v-else><i class="ion-heart"></i> {{ favoritesCount }}</template>
	</button>
</template>

<script>
import { mapActions } from "pinia";
import { useArticleStore } from "../stores/article";

export default {
	name: "McvAddToFavorites",
	props: {
		isFavorited: {
			type: Boolean,
			required: true,
		},
		articleSlug: {
			type: String,
			required: true,
		},
		favoritesCount: {
			type: Number,
			required: true,
		},
		isWithTitle: {
			type: Boolean,
			required: false,
		},
	},
	data() {
		return {
			isSubmitting: false,
		};
	},
	methods: {
		onClick() {
			this.favoriteArticle({
				slug: this.articleSlug,
				isFavorited: this.isFavorited,
			});
		},
		...mapActions(useArticleStore, ["favoriteArticle"]),
	},
};
</script>
