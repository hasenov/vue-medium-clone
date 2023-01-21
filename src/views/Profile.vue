<template>
	<mcv-loading v-if="isLoading" />
	<mcv-error v-if="error" :message="error" />
	<div class="profile-page" v-if="data">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img class="user-img" :src="data.image" />
						<h4>{{ data.username }}</h4>
						<p>{{ data.bio }}</p>
						<RouterLink class="btn btn-sm btn-outline-secondary action-btn" :to="{ name: 'settings' }" v-if="isOwner"><i class="ion-gear-a"></i> Edit Profile Settings</RouterLink>
						<button class="btn btn-sm action-btn btn-outline-secondary" v-else>
							<i class="ion-plus-round"></i>
							&nbsp; Follow {{ data.username }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<mcv-feed :apiUrl="apiUrl" :tabs="tabs" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "../stores/auth";
import McvFeed from "@/components/Feed.vue";
import McvLoading from "@/components/Loading.vue";
import McvError from "@/components/Error.vue";

export default {
	name: "McvProfile",
	components: {
		McvLoading,
		McvError,
		McvFeed,
	},
	computed: {
		...mapState(useProfileStore, ["data", "isLoading", "error"]),
		...mapState(useAuthStore, ["currentUser"]),
		isOwner() {
			if (!this.data || !this.currentUser) return false;
			return this.data.username === this.currentUser.username;
		},
		slug() {
			return this.$route.params.slug;
		},
		apiUrl() {
			return this.$route.name === "userProfileFavorites" ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
		},
		tabs() {
			let tabs = [];
			tabs.push(
				{
					title: "My Articles",
					to: {
						name: "userProfile",
					},
				},
				{
					title: "Favorited Articles",
					to: {
						name: "userProfileFavorites",
					},
				}
			);
			return tabs;
		},
	},
	methods: {
		...mapActions(useProfileStore, ["fetchProfile"]),
	},
	watch: {
		slug() {
			this.fetchProfile({
				slug: this.slug,
			});
		},
	},
	mounted() {
		this.fetchProfile({
			slug: this.slug,
		});
	},
};
</script>
