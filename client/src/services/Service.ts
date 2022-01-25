import { AxiosResponse } from 'axios';
import axiosApiInstance from './axiosApiInstance';

export class Service<T> {
    url: string;

    constructor() {
        this.url = '';
    }

    public get = (
        urlParams: string[],
        successCallback: (response: AxiosResponse<T[]>) => void,
        errorCallback?: (reason: any) => void
    ) => {
        let url = this.url;

        if (urlParams.length > 0) {
            url = `${url}/${urlParams[0]}`;
        }

        axiosApiInstance
            .get(url)
            .then((response: AxiosResponse<T[]>) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };

    public post = (
        data: T,
        successCallback: (response: AxiosResponse<T>) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axiosApiInstance
            .post(this.url, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };

    public put = (
        data: T,
        successCallback: (response: AxiosResponse<T>) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axiosApiInstance
            .put(this.url, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };
}
