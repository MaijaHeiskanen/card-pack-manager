import { getRepository } from 'typeorm';
import { Deck } from '../models';

export interface IDeckPayload {
    name: string;
    nsfw: boolean;
    ownerId: string;
}

export const getDecks = async (): Promise<Array<Deck>> => {
    const deckRepository = getRepository(Deck);

    return deckRepository.find();
};

export const createDeck = async (payload: IDeckPayload): Promise<Deck> => {
    const deckRepository = getRepository(Deck);
    const deck = new Deck();

    return deckRepository.save({
        ...deck,
        ...payload,
    });
};

export const getDeck = async (id: number): Promise<Deck | null> => {
    const deckRepository = getRepository(Deck);
    const deck = await deckRepository.findOne({ id });

    if (!deck) {
        return null;
    }

    return deck;
};
