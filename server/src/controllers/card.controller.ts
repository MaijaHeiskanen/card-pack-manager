import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Card } from '../models';
import { getCard, createCard, ICardPayload } from '../repositories/card.repository';

@Route('cards')
@Tags('Card')
export default class CardController {
    @Post('/')
    public async createCard(@Body() body: ICardPayload): Promise<Card> {
        return createCard(body);
    }

    @Get('/:id')
    public async getCard(@Path() id: string): Promise<Card | null> {
        return getCard(Number(id));
    }
}
