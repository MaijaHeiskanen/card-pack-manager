import { Get, Route, Tags, Post, Body, Path, Put, Header, BodyProp } from 'tsoa';
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

    @Post('/:user')
    public async createCardpack(user: string, @Body() body: ICardpackPayload): Promise<Cardpack> {
        return createCardpack(body);
    }

    @Put('/:user')
    public async updateCardpack(user: string, @Body() body: IUpdateCardpackPayload): Promise<Cardpack> {
        return updateCardpack(body);
    }

    @Get('/:id')
    public async getCardpack(@Path() id: string): Promise<Cardpack[]> {
        return getCardpack(id);
    }
}
