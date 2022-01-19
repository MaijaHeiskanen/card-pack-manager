import axios from 'axios';
import { getAccessToken } from '../auth/accessTokenHelpers';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();

        config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        };
        return config;
    },
    (error) => {
        console.log('axios error thing', error);

        Promise.reject(error);
    }
);

export default axiosApiInstance;
