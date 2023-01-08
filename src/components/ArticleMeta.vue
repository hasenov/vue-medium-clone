<template>
	<div class="article-meta">
		<RouterLink
			:to="{
				name: 'userProfile',
				params: { slug: article.author.username },
			}"
		>
			<img :src="article.author.image" />
		</RouterLink>

		<div class="info">
			<RouterLink
				:to="{
					name: 'userProfile',
					params: { slug: article.author.username },
				}"
				class="author"
			>
				{{ article.author.username }}
			</RouterLink>
			<span class="date">{{ article.createdAt }}</span>
		</div>

		<span v-if="isAuthor">
			<RouterLink
				class="btn btn-outline-secondary btn-sm"
				:to="{
					name: 'editArticle',
					params: { slug: article.slug },
				}"
			>
				<i class="ion-edit"></i> Edit Article
			</RouterLink>

			<button class="btn btn-outline-danger btn-sm" @click="deleteItem"><i class="ion-trash-a"></i> Delete Article</button>
		</span>

		<span v-if="!isAuthor">
			<button class="btn btn-sm action-btn btn-secondary">
				<i class="ion-plus-round"></i> Unfollow
				{{ article.author.username }}
			</button>
			<button class="btn btn-sm btn-outline-primary">
				<i class="ion-heart"></i>
				<span>Favorite Article </span>
				<span class="counter">{{ article.favoritesCount }}</span>
			</button>
		</span>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../stores/auth";
import { useArticleStore } from "../stores/article";

export default {
	name: "McvArticleMeta",
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
	computed: {
		isAuthor() {
			if (!this.currentUser || !this.article) {
				return false;
			}
			return this.currentUser.username === this.article.author.username;
		},
		...mapState(useAuthStore, ["currentUser"]),
	},
	methods: {
		...mapActions(useArticleStore, ["deleteArticle"]),
		deleteItem() {
			this.deleteArticle({
				slug: this.$route.params.slug,
			}).then(() => {
				this.$router.push({
					name: "globalFeed",
				});
			});
		},
	},
};
</script>
