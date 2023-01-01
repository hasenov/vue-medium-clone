import axios from "axios";
import { getItem } from '@/helpers/persistanceStorage';

axios.defaults.baseURL = 'https://api.realworld.io/api/';
// axios.defaults.headers.common['Authorization'] = `Token ${getItem('accessToken')}`;

axios.interceptors.request.use((config) => {
    const token = getItem('accessToken');
    const authorizationToken = token ? `Token ${token}` : '';

    config.headers.Authorization = authorizationToken;

    return config;
});

export default axios;