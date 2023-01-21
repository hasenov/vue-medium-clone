<template>
	<div class="article-page">
		<div class="banner">
			<mcv-loading v-if="isLoading" />
			<div class="container" v-if="data">
				<h1>{{ data.title }}</h1>

				<mcv-article-meta :article="data" />
			</div>
		</div>

		<div class="container page">
			<mcv-error v-if="error" :message="error" />
			<div class="row article-content" v-if="data">
				<div class="col-xs-12">
					<div>
						<p>
							{{ data.body }}
						</p>
					</div>

					<mcv-tag-list v-if="data.tagList.length > 1" :tagList="data.tagList" />
				</div>
			</div>

			<hr />

			<div class="article-actions" v-if="data">
				<mcv-article-meta :article="data" />
			</div>

			<!-- Comments section -->
			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<ul class="error-messages"></ul>
					<form class="card comment-form">
						<div class="card-block">
							<textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
						</div>
						<div class="card-footer">
							<img class="comment-author-img" src="https://api.realworld.io/images/smiley-cyrus.jpeg" />
							<button class="btn btn-sm btn-primary" type="submit">Post Comment</button>
						</div>
					</form>

					<p>
						<a href="#/login">Sign in</a> or
						<a href="#/register">sign up</a>
						to add comments on this article.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useArticleStore } from "@/stores/article";
import McvError from "@/components/Error.vue";
import McvLoading from "@/components/Loading.vue";
import McvTagList from "@/components/TagList.vue";
import McvArticleMeta from "@/components/ArticleMeta.vue";

export default {
	name: "McvArticle",
	components: {
		McvError,
		McvLoading,
		McvTagList,
		McvArticleMeta,
	},
	computed: {
		...mapState(useArticleStore, ["data", "isLoading", "error"]),
	},
	methods: {
		...mapActions(useArticleStore, ["fetchArticle"]),
	},
	mounted() {
		this.fetchArticle({
			slug: this.$route.params.slug,
		});
	},
};
</script>
