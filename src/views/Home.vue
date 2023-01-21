<template>
	<div class="home-page">
		<mcv-banner />
		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<mcv-feed :apiUrl="apiUrl" :tabs="tabs" />
				</div>
				<div class="col-md-3">
					<mcv-popular-tags />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import McvFeed from "@/components/Feed.vue";
import McvPopularTags from "../components/PopularTags.vue";
import McvBanner from "@/components/Banner.vue";
import { mapState } from "pinia";
import { useAuthStore } from "../stores/auth";

export default {
	name: "McvGlobalFeed",
	components: {
		McvFeed,
		McvPopularTags,
		McvBanner,
	},
	computed: {
		tagName() {
			return this.$route.params.slug;
		},
		routeName() {
			return this.$route.name;
		},
		apiUrl() {
			if (this.routeName === "globalFeed") {
				return "/articles";
			}
			if (this.routeName === "yourFeed") {
				return "/articles/feed";
			}
			if (this.routeName === "tag") {
				return `/articles?tag=${this.tagName}`;
			}
		},
		tabs() {
			let tabs = [];

			if (this.isLoggedInBoolean) {
				tabs.push({
					title: "Your Feed",
					to: {
						name: "yourFeed",
					},
				});
			}

			tabs.push({
				title: "Global Feed",
				to: {
					name: "globalFeed",
				},
			});

			if (this.tagName) {
				tabs.push({
					title: this.tagName,
					to: {
						name: "tag",
						params: {
							slug: this.tagName,
						},
					},
					icon: "ion-pound",
				});
			}

			return tabs;
		},
		...mapState(useAuthStore, ["isLoggedInBoolean"]),
	},
};
</script>
