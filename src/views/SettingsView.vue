<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>
					<ul class="error-messages"></ul>

					<McvValidationErrors v-if="validationErrors" :validationErrors="validationErrors" />

					<form @submit.prevent="onSubmit">
						<fieldset>
							<fieldset class="form-group">
								<input class="form-control" type="text" placeholder="URL of profile picture" v-model="form.image" />
							</fieldset>

							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="text" placeholder="Username" v-model="form.username" />
							</fieldset>

							<fieldset class="form-group">
								<textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="form.bio"></textarea>
							</fieldset>

							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="email" placeholder="Email" v-model="form.email" />
							</fieldset>

							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="password" placeholder="New Password" v-model="form.password" />
							</fieldset>

							<button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="isSubmitting">Update Settings</button>
						</fieldset>
					</form>

					<hr />

					<button class="btn btn-outline-danger" @click="onLogout">Or click here to logout.</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../stores/auth";
import { useSettingsStore } from "../stores/settings";
import McvValidationErrors from "@/components/ValidationErrors.vue";

export default {
	name: "McvSettingsView",
	components: {
		McvValidationErrors,
	},
	computed: {
		...mapState(useAuthStore, ["currentUser"]),
		...mapState(useSettingsStore, ["isSubmitting", "validationErrors"]),
		form() {
			if (!this.currentUser) {
				return {
					email: "",
					username: "",
					bio: "",
					image: "",
					password: "",
				};
			}
			return {
				email: this.currentUser.email,
				username: this.currentUser.username,
				bio: this.currentUser.bio,
				image: this.currentUser.image,
				password: "",
			};
		},
	},
	methods: {
		onSubmit() {
			this.updateCurrentUser({
				currentUserInput: this.form,
			});
		},
		onLogout() {
			this.logout().then(() => {
				this.$router.push({ name: "globalFeed" });
			});
		},
		...mapActions(useAuthStore, ["updateCurrentUser", "logout"]),
	},
};
</script>
