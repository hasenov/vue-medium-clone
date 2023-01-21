import axios from "./axios";

function fetchProfile(slug) {
	return axios.get(`/profiles/${slug}`).then((res) => res.data.profile);
}

export default {
	fetchProfile,
};
