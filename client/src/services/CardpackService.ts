import { AxiosResponse } from 'axios';
import { Cardpack } from '../types/generated-types-d';
import axiosApiInstance from './axiosApiInstance';
import { Service } from './Service';

export interface CardpackWithCards extends Cardpack {
    blackCards: Card[];
    whiteCards: Card[];
}

export class CardpackService extends Service<Cardpack> {
    url = '/cardpacks';

    public get = <CardpackType>(
        urlParams: string[],
        successCallback: (response: AxiosResponse<CardpackType[]>) => void,
        errorCallback?: (reason: any) => void
    ) => {
        let url = this.url;

        if (urlParams.length > 0) {
            url = `${url}/${urlParams[0]}`;
        }

        axiosApiInstance
            .get(url)
            .then((response: AxiosResponse<CardpackType[]>) => {
                successCallback(response);
            })
            .catch((reason) => {
                if (errorCallback) errorCallback(reason);
            });
    };
}
