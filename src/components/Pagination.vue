<template>
	<ul class="pagination">
		<li
			v-for="page in pages"
			:key="page"
			class="page-item"
			:class="{ active: page === currentPage }"
		>
			<RouterLink
				:to="{ path: url, query: { page: page } }"
				class="page-link"
				>{{ page }}</RouterLink
			>
		</li>
	</ul>
</template>

<script>
import { range } from "@/helpers/utils";
import { RouterLink } from "vue-router";

export default {
	name: "McvPagination",
	props: {
		total: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	computed: {
		pages() {
			const pagesCount = Math.ceil(this.total / this.limit);
			return range(1, pagesCount);
		},
	},
	components: { RouterLink, RouterLink },
};
</script>
