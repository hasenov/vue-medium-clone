import axios from "./axios";

function fetchPopularTags() {
	return axios.get("/tags");
}

export default {
	fetchPopularTags,
};
