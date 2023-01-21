import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Article from "../views/Article.vue";
import CreateArticle from "../views/CreateArticle.vue";
import EditArticle from "../views/EditArticle.vue";
import Settings from "../views/Settings.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/",
			name: "globalFeed",
			component: Home,
		},
		{
			path: "/feed",
			name: "yourFeed",
			component: Home,
		},
		{
			path: "/tags/:slug",
			name: "tag",
			component: Home,
		},
		{
			path: "/articles/new",
			name: "createArticle",
			component: CreateArticle,
		},
		{
			path: "/articles/:slug",
			name: "article",
			component: Article,
		},
		{
			path: "/articles/:slug/edit",
			name: "editArticle",
			component: EditArticle,
		},
		{
			path: "/settings",
			name: "settings",
			component: Settings,
		},
		{
			path: "/profiles/:slug",
			name: "userProfile",
			component: Profile,
		},
		{
			path: "/profiles/:slug/favorites",
			name: "userProfileFavorites",
			component: Profile,
		},
		// {
		//   path: '/about',
		//   name: 'about',
		//   // route level code-splitting
		//   // this generates a separate chunk (About.[hash].js) for this route
		//   // which is lazy-loaded when the route is visited.
		//   component: () => import('../views/AboutView.vue')
		// }
	],
});

export default router;
