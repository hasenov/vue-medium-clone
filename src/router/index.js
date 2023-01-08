import { createRouter, createWebHistory } from "vue-router";
import GlobalFeedView from "../views/GlobalFeedView.vue";
import YourFeedView from "../views/YourFeedView.vue";
import TagFeedView from "../views/TagFeedView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import Article from "../views/ArticleView.vue";
import CreateArticle from "../views/CreateArticleView.vue";
import EditArticle from "../views/EditArticleView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/register",
			name: "register",
			component: RegisterView,
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/",
			name: "globalFeed",
			component: GlobalFeedView,
		},
		{
			path: "/feed",
			name: "yourFeed",
			component: YourFeedView,
		},
		{
			path: "/tags/:slug",
			name: "tag",
			component: TagFeedView,
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
			component: LoginView,
		},
		{
			path: "/profiles/:slug",
			name: "userProfile",
			component: LoginView,
		},
		{
			path: "/profiles/:slug/favorites",
			name: "userProfileFavorites",
			component: LoginView,
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
