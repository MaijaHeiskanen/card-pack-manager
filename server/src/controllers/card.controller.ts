import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import {
    getCard,
    createCard,
    ICardPayload,
    getCardsByCardpackId,
    Card,
    CardsOfCardpack,
} from '../repositories/card.repository';

@Route('cards')
@Tags('Card')
export default class CardController {
    @Post('/')
    public async createCard(@Body() body: ICardPayload): Promise<Card> {
        return createCard(body);
    }

    @Get('/:id')
    public async getCard(@Path() id: string): Promise<Card | null> {
        return getCard(id);
    }

    @Get('/cardpack/:id')
    public async getCardsByCardpackId(@Path() id: string): Promise<CardsOfCardpack> {
        return getCardsByCardpackId(id);
    }
}
