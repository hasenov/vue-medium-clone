<template>
<nav class="navbar navbar-light">
    <div class="container">

        <RouterLink :to="{name: 'globalFeed'}" exact class="navbar-brand">Medium Clone</RouterLink>
    
        <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
                <RouterLink :to="{name: 'globalFeed'}" exact class="nav-link" active-class="active">Home</RouterLink>
            </li>

            <template v-if="isAnonymous">
                <li class="nav-item">
                    <RouterLink :to="{name: 'login'}" class="nav-link" active-class="active">Sign in</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{name: 'register'}" class="nav-link" active-class="active">Sign up</RouterLink>
                </li>
            </template>

            <template v-if="isLoggedInBoolean">
                <li class="nav-item">
                    <RouterLink :to="{name: 'createArticle'}" class="nav-link" active-class="active">
                        <i class="ion-compose"></i>
                        New Article
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{name: 'settings'}" class="nav-link" active-class="active">
                        <i class="ion-gear-a"></i>
                        Settings
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{name: 'userProfile', params: {slug: currentUser.username}}" class="nav-link" active-class="active">
                        <img class="user-pic" :src="currentUser.image" />
                        {{ currentUser.username }}
                    </RouterLink>
                </li>
            </template>
        </ul>

    </div>
</nav>
</template>

<script>
import { mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';

export default {
    name: 'McvTopbar',
    computed: {
        ...mapState(useAuthStore, ['isLoggedInBoolean', 'isAnonymous', 'currentUser'])
    }
}
</script>