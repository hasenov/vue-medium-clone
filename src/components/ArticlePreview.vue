<template>
	<div class="article-preview">
		<div class="article-meta">
			<RouterLink
				:to="{
					name: 'userProfile',
					params: { slug: article.author.username },
				}"
			>
				<img :src="article.author.image" :alt="article.author.username" />
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
			<div class="pull-xs-right">
				<mcv-add-to-favorites :isFavorited="article.favorited" :articleSlug="article.slug" :favoritesCount="article.favoritesCount" />
			</div>
		</div>
		<RouterLink
			:to="{
				name: 'article',
				params: { slug: article.slug },
			}"
			class="preview-link"
		>
			<h2>{{ article.title }}</h2>
			<p>{{ article.description }}</p>
			<span>Read more...</span>
			<mcv-tag-list :tagList="article.tagList" />
		</RouterLink>
	</div>
</template>

<script>
import McvAddToFavorites from "@/components/AddToFavorites.vue";
import McvTagList from "@/components/TagList.vue";
export default {
	name: "McvArticlePreview",
	components: {
		McvAddToFavorites,
		McvTagList,
	},
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
};
</script>
