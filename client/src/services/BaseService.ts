import { AxiosResponse } from 'axios';
import axiosApiInstance from './axiosApiInstance';

export class BaseService<T> {
    url: string;

    constructor() {
        this.url = '';
    }

    get = (successCallback: (response: AxiosResponse) => void) => {
        axiosApiInstance.get(this.url).then((response) => {
            successCallback(response);
        });
    };

    post = (data: T, successCallback: (response: AxiosResponse) => void) => {
        axiosApiInstance.post(this.url, data).then((response) => {
            successCallback(response);
        });
    };

    patch = (data: T, successCallback: (response: AxiosResponse) => void) => {
        axiosApiInstance.patch(this.url, data).then((response) => {
            successCallback(response);
        });
    };
}
