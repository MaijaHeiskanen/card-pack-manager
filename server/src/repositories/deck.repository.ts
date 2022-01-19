import { getRepository } from 'typeorm';
import { Deck } from '../models';

export interface IDeckPayload {
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    languageCode: string;
}

export interface IUpdateDeckPayload extends IDeckPayload {
    id: string;
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

export const getDeck = async (id: string): Promise<Deck | null> => {
    const deckRepository = getRepository(Deck);
    const deck = await deckRepository.findOne({ id });

    if (!deck) {
        return null;
    }

    return deck;
};

export const updateDeck = async (payload: IUpdateDeckPayload): Promise<Deck | null> => {
    const id = payload.id;

    if (!id) {
        return null;
    }

    const deckRepository = getRepository(Deck);

    const deckExists = await !!deckRepository.findOne({ id });

    if (!deckExists) {
        return null;
    }

    const deck = new Deck();

    return deckRepository.save({
        ...deck,
        ...payload,
    });
};
