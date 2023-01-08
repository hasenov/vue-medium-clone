<template>
	<McvLoading v-if="isLoading" />
	<McvArticleForm v-if="article" :initialValues="initialValues" :errors="validationErrors" :isSubmitting="isSubmitting" @articleSubmit="onSubmit" />
</template>

<script>
import McvArticleForm from "@/components/ArticleForm.vue";
import { mapActions, mapState } from "pinia";
import { useEditArticleStore } from "../stores/editArticle";
import McvLoading from "@/components/Loading.vue";

export default {
	name: "McvEditArticle",
	components: {
		McvArticleForm,
		McvLoading,
	},
	computed: {
		...mapState(useEditArticleStore, ["isSubmitting", "validationErrors", "isLoading", "article"]),
		initialValues() {
			if (!this.article) {
				return null;
			}
			return {
				title: this.article.title,
				description: this.article.description,
				body: this.article.body,
				tagList: this.article.tagList,
			};
		},
	},
	methods: {
		onSubmit(articleInput) {
			this.editArticle({
				slug: this.$route.params.slug,
				articleInput,
			}).then((res) => {
				this.$router.push({ name: "article", params: { slug: res.slug } });
			});
		},
		...mapActions(useEditArticleStore, ["editArticle", "getArticle"]),
	},
	mounted() {
		this.getArticle({ slug: this.$route.params.slug });
	},
};
</script>
