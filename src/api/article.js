import axios from "./axios";

function fetchArticle(slug) {
	return axios.get(`/articles/${slug}`).then((res) => res.data.article);
}

function deleteArticle(slug) {
	return axios.delete(`/articles/${slug}`);
}

function createArticle(articleInput) {
	return axios.post("/articles/", { article: articleInput }).then((res) => res.data.article);
}

function updateArticle(slug, articleInput) {
	return axios.put(`/articles/${slug}`, { article: articleInput }).then((res) => res.data.article);
}

function favoriteArticle(slug) {
	return axios.post(`/articles/${slug}/favorite`).then((res) => res.data.article);
}

function unFavoriteArticle(slug) {
	return axios.delete(`/articles/${slug}/favorite`).then((res) => res.data.article);
}

export default {
	fetchArticle,
	deleteArticle,
	createArticle,
	updateArticle,
	favoriteArticle,
	unFavoriteArticle,
};
