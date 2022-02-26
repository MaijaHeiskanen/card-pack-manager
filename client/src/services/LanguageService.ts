import { AxiosResponse } from 'axios';
import { BlackCard, Cardpack, ICardpackPayload, Language, WhiteCard } from '../types/generated-types-d';
import axiosApiInstance from './axiosApiInstance';
import { Service } from './Service';

export class LanguageService extends Service<Language> {
    url = '/languages';
}
