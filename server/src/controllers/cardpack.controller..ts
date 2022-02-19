import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { LOGIN_STATUS, UserError } from '../errors/userErrors';
import { Cardpack, User } from '../models';
import {
    getCardpacks,
    createCardpack,
    updateCardpack,
    ICardpackPayload,
    IUpdateCardpackPayload,
    getCardpack,
} from '../repositories/cardpack.repository';

@Route('cardpacks')
@Tags('Cardpack')
export default class CardpackController {
    @Get('/')
    public async getCardpacks(): Promise<Array<Cardpack>> {
        return getCardpacks();
    }

    @Post('/')
    public async createCardpack(@Body() body: ICardpackPayload, user: User): Promise<Cardpack> {
        return createCardpack(body);
    }

    @Post('/id')
    public async updateCardpack(@Body() body: IUpdateCardpackPayload, user: User): Promise<Cardpack> {
        return updateCardpack(body);
    }

    @Get('/:id')
    public async getCardpack(@Path() id: string): Promise<Cardpack[]> {
        return getCardpack(id);
    }
}
