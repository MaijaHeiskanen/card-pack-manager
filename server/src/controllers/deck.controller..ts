import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Deck } from '../models';
import {
    getDecks,
    createDeck,
    updateDeck,
    IDeckPayload,
    IUpdateDeckPayload,
    getDeck,
} from '../repositories/deck.repository';

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

    @Post('/id')
    public async updateDeck(@Body() body: IUpdateDeckPayload): Promise<Deck | null> {
        return updateDeck(body);
    }

    @Get('/:id')
    public async getDeck(@Path() id: string): Promise<Deck | null> {
        return getDeck(id);
    }
}
