import { getRepository } from 'typeorm';
import { Card } from '../models';
import { CardType } from '../types/card';

export interface ICardPayload {
    type: CardType;
    text: string;
    cardpackId: string;
}

export interface IUpdateCardPayload extends ICardPayload {
    id: string;
}

export const createCard = async (payload: ICardPayload): Promise<Card> => {
    const cardRepository = getRepository(Card);
    const card = new Card();

    return cardRepository.save({
        ...card,
        ...payload,
    });
};

export const getCard = async (id: string): Promise<Card | null> => {
    const cardRepository = getRepository(Card);
    const card = await cardRepository.findOne({ id });

    if (!card) {
        return null;
    }

    return card;
};

export const getCardsByCardpackId = async (id: string): Promise<Card[]> => {
    const cardRepository = getRepository(Card);
    const cards = await cardRepository.find({ cardpackId: id });

    return cards;
};

export const updateCard = async (payload: IUpdateCardPayload): Promise<Card | null> => {
    const id = payload.id;

    if (!id) {
        return null;
    }

    const cardRepository = getRepository(Card);

    const cardExists = await !!cardRepository.findOne({ id });

    if (!cardExists) {
        return null;
    }

    const card = new Card();

    return cardRepository.save({
        ...card,
        ...payload,
    });
};
