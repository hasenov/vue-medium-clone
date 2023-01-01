<script>
import { RouterLink } from 'vue-router'

export default {
    name: 'McvLogin',
    methods: {
        onSubmit() {
            
        }
    }
}
</script>

<template>
<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Login</h1>
                <p class="text-xs-center">
                    <RouterLink :to="{name: 'register'}">Need an account?</RouterLink>
                </p>
                Validation errors
                <form @submit.prevent="onSubmit">
                    <fieldset class="form-group">
                        <input
                            class="form-control form-control-lg"
                            type="text"
                            placeholder="Email"
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <input
                            class="form-control form-control-lg"
                            type="password"
                            placeholder="Password"
                        />
                    </fieldset>
                    <button
                        class="btn btn-lg btn-primary pull-xs-right"
                        >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>