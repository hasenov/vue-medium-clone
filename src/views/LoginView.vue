<script>
import { mapActions, mapState, mapStores } from "pinia";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth";
import McvValidationErrors from "@/components/ValidationErrors.vue";

export default {
	name: "McvLogin",
	components: {
		McvValidationErrors,
	},
	methods: {
		onSubmit() {
			this.login({
				email: this.email,
				password: this.password,
			}).then((user) => {
				this.$router.push({ name: "globalFeed" });
			});
		},
		...mapActions(useAuthStore, ["login"]),
	},
	data() {
		return {
			email: "",
			password: "",
		};
	},
	computed: {
		...mapState(useAuthStore, ["isSubmitting", "validationErrors"]),
		...mapStores(useAuthStore),
	},
	beforeUnmount() {
		this.authStore.validationErrors = null;
	},
};
</script>

<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Login</h1>
					<p class="text-xs-center">
						<RouterLink :to="{ name: 'register' }"
							>Need an account?</RouterLink
						>
					</p>
					<McvValidationErrors
						v-if="validationErrors"
						:validationErrors="validationErrors"
					/>
					<form @submit.prevent="onSubmit">
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Email"
								v-model="email"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="password"
								placeholder="Password"
								v-model="password"
							/>
						</fieldset>
						<button
							class="btn btn-lg btn-primary pull-xs-right"
							:disabled="isSubmitting"
						>
							Sign In
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
