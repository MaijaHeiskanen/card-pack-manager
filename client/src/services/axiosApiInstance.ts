import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '../auth/localstoragehelpers';

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
        console.log('axios request error', error);

        Promise.reject(error);
    }
);
axiosApiInstance.interceptors.response.use(
    // Responses with status codes 2xx
    (response: AxiosResponse) => {
        return response;
    },
    // Responses with other status codes
    (error) => {
        // TODO: Check if jwt was expired and try to refresh it, then re-send request?
        return Promise.reject(error);
    }
);

export default axiosApiInstance;
