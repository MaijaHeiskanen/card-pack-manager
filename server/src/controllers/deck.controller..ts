import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Deck } from '../models';
import { getDecks, createDeck, IDeckPayload, getDeck } from '../repositories/deck';

@Route('decks')
@Tags('Deck')
export default class DeckController {
    @Get('/')
    public async getDecks(): Promise<Array<Deck>> {
        return getDecks();
    }

    @Post('/')
    public async createDeck(@Body() body: IDeckPayload): Promise<Deck> {
        return createDeck(body);
    }

    @Get('/:id')
    public async getDeck(@Path() id: string): Promise<Deck | null> {
        return getDeck(Number(id));
    }
}
