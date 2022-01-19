import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { LOGIN_STATUS, UserError } from '../errors/userErrors';
import { Cardpack } from '../models';
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
    public async createCardpack(@Body() body: ICardpackPayload): Promise<Cardpack> {
        return createCardpack(body);
    }

    @Post('/id')
    public async updateCardpack(@Body() body: IUpdateCardpackPayload): Promise<Cardpack | null> {
        return updateCardpack(body);
    }

    @Get('/:id')
    public async getCardpack(@Path() id: string): Promise<Cardpack | null> {
        return getCardpack(id);
    }
}
