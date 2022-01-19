import { AxiosResponse } from 'axios';
import { Cardpack } from '../types/generated-types-d';
import axiosApiInstance from './axiosApiInstance';
import { BaseService } from './BaseService';

export class CardpackService extends BaseService<Cardpack> {
    url = '/cardpacks';
}
