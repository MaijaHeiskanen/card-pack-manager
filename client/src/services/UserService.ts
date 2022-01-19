import axios, { AxiosResponse } from 'axios';
import axiosApiInstance from './axiosApiInstance';

export class UserService {
    url = '/users';

    public login = (
        data: { tokenId: string },
        successCallback: (response: AxiosResponse) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axiosApiInstance
            .post(`${this.url}/login`, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };
}
