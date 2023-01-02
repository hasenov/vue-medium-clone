import axios from './axios';

function fetchFeed(url) {
    return axios.get(url);
}

export default {
    fetchFeed
}