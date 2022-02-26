import { AxiosResponse } from 'axios';
import { BlackCard, Cardpack, ICardpackPayload, WhiteCard } from '../types/generated-types-d';
import axiosApiInstance from './axiosApiInstance';
import { Service } from './Service';

export interface CardpackWithCards extends Cardpack {
    blackCards: BlackCard[];
    whiteCards: WhiteCard[];
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

    public post = (
        data: ICardpackPayload,
        successCallback: (response: AxiosResponse<Cardpack>) => void,
        errorCallback?: (reason: any) => void
    ) => {
        axiosApiInstance
            .post(this.url, data)
            .then((response) => {
                successCallback(response);
            })
            .catch((error) => {
                if (errorCallback) errorCallback(error);
            });
    };
}
