<template>
	<ul class="tag-list">
		<li class="tag-default tag-pill tag-outline" v-for="tag in tagList">
			{{ tag }}
		</li>
	</ul>
</template>

<script>
export default {
	name: "McvTagList",
	props: {
		tagList: {
			type: Array,
			required: true,
		},
	},
};
</script>
