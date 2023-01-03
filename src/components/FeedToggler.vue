<template>
	<div class="feed-toggle">
		<ul class="nav nav-pills outline-active">
			<li class="nav-item" v-if="isLoggedInBoolean">
				<RouterLink
					:to="{
						name: 'yourFeed',
					}"
					class="nav-link"
					:class="{
						active: routeName === 'yourFeed',
					}"
				>
					Your Feed
				</RouterLink>
			</li>

			<li class="nav-item">
				<RouterLink
					:to="{
						name: 'globalFeed',
					}"
					class="nav-link"
					:class="{
						active: routeName === 'globalFeed',
					}"
				>
					Global Feed
				</RouterLink>
			</li>

			<li class="nav-item" v-if="tagName">
				<RouterLink
					:to="{
						name: 'tag',
						params: {
							slug: tagName,
						},
					}"
					class="nav-link"
					:class="{
						active: routeName === 'tag',
					}"
				>
					<i class="ion-pound"></i>
					{{ tagName }}
				</RouterLink>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "../stores/auth";

export default {
	name: "McvFeedToggler",
	props: {
		tagName: {
			type: String,
			required: false,
		},
	},
	computed: {
		routeName() {
			return this.$route.name;
		},
		...mapState(useAuthStore, ["isLoggedInBoolean"]),
	},
};
</script>
