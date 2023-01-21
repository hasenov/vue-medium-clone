<template>
	<mcv-article-form :initialValues="initialValues" :errors="validationErrors" :isSubmitting="isSubmitting" @articleSubmit="onSubmit" />
</template>

<script>
import McvArticleForm from "@/components/ArticleForm.vue";
import { mapActions, mapState } from "pinia";
import { useCreateArticleStore } from "../stores/createArticle";
import McvLoading from "@/components/Loading.vue";

export default {
	name: "McvCreateArticle",
	components: {
		McvArticleForm,
		McvLoading,
	},
	data() {
		return {
			initialValues: {
				title: "",
				description: "",
				body: "",
				tagList: [],
			},
		};
	},
	computed: {
		...mapState(useCreateArticleStore, ["isSubmitting", "validationErrors"]),
	},
	methods: {
		onSubmit(articleInput) {
			this.createArticle({
				articleInput: articleInput,
			}).then((res) => {
				this.$router.push({ name: "article", params: { slug: res.slug } });
			});
		},
		...mapActions(useCreateArticleStore, ["createArticle"]),
	},
};
</script>
