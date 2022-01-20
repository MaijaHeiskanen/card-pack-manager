import axios, { AxiosResponse } from 'axios';

export class UserService {
    url = '/users';

    constructor() {
        this.url = '/users';
    }

    public login = (
        data: { tokenId: string },
        successCallback: (response: AxiosResponse) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axios
            .post(`${this.url}/login`, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };

    public register = (
        data: {
            tokenId: string;
            username: string;
        },
        successCallback: (response: AxiosResponse) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axios
            .post(`${this.url}/register`, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };

    public validateUsername = (
        data: {
            username: string;
        },
        successCallback: (response: AxiosResponse) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axios
            .post(`${this.url}/register/validate/username`, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };

    public validateTokenId = (
        data: {
            tokenId: string;
        },
        successCallback: (response: AxiosResponse) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axios
            .post(`${this.url}/register/validate/tokenId`, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };
}
