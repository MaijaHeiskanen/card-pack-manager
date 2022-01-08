import { getRepository } from 'typeorm';
import { Card } from '../models';
import { CardType } from '../types/card';

export interface ICardPayload {
    type: CardType;
    text: string;
    deckId: number;
}

export const createCard = async (payload: ICardPayload): Promise<Card> => {
    const cardRepository = getRepository(Card);
    const card = new Card();

    return cardRepository.save({
        ...card,
        ...payload,
    });
};

export const getCard = async (id: number): Promise<Card | null> => {
    const cardRepository = getRepository(Card);
    const card = await cardRepository.findOne({ id });

    if (!card) {
        return null;
    }

    return card;
};
