import { getRepository } from 'typeorm';
import { BlackCard, WhiteCard } from '../models';
import { CardType } from '../types/card';
import { CARDTYPES } from '../types/enums/card';

export type Card = BlackCard | WhiteCard;

export interface ICardPayload {
    type: CardType;
    text: string;
    cardpackId: string;
}

export interface IUpdateCardPayload extends ICardPayload {
    id: string;
}

export interface CardsOfCardpack {
    whiteCards: WhiteCard[];
    blackCards: BlackCard[];
}

export interface CardsCountOfCardpack {
    whiteCardsCount: number;
    blackCardsCount: number;
}

export const createCard = async (payload: ICardPayload): Promise<Card> => {
    const CardModel = payload.type === CARDTYPES.WHITE ? WhiteCard : BlackCard;

    const cardRepository = getRepository(CardModel);
    const card = new CardModel();

    return cardRepository.save({
        ...card,
        ...payload,
    });
};

export const getCard = async (id: string): Promise<Card | null> => {
    const whiteCardRepository = getRepository(WhiteCard);
    let card = await whiteCardRepository.findOne({ id });

    if (!card) {
        const blackCardRepository = getRepository(BlackCard);
        card = await blackCardRepository.findOne({ id });

        if (!card) {
            return null;
        }
    }

    return card;
};

export const getCardsByCardpackId = async (id: string): Promise<CardsOfCardpack> => {
    const whiteCardRepository = getRepository(WhiteCard);
    const blackCardRepository = getRepository(BlackCard);

    const whiteCards = await whiteCardRepository.find({ cardpackId: id });
    const blackCards = await blackCardRepository.find({ cardpackId: id });

    return { whiteCards, blackCards };
};

export const getCardsCountsByCardpackId = async (id: string): Promise<CardsCountOfCardpack> => {
    const whiteCardRepository = getRepository(WhiteCard);
    const blackCardRepository = getRepository(BlackCard);

    const whiteCardsCount = await whiteCardRepository
        .createQueryBuilder('whiteCard')
        .where('whiteCard.cardpackId = :cardpackId', { cardpackId: id })
        .getCount();
    const blackCardsCount = await blackCardRepository
        .createQueryBuilder('blackCard')
        .where('blackCard.cardpackId = :cardpackId', { cardpackId: id })
        .getCount();

    return { whiteCardsCount, blackCardsCount };
};

export const updateCard = async (payload: IUpdateCardPayload): Promise<Card | null> => {
    const id = payload.id;

    if (!id) {
        return null;
    }

    const CardModel = payload.type === CARDTYPES.WHITE ? WhiteCard : BlackCard;
    const cardRepository = getRepository(CardModel);

    const cardExists = await !!cardRepository.findOne({ id });

    if (!cardExists) {
        return null;
    }

    const card = new CardModel();

    return cardRepository.save({
        ...card,
        ...payload,
    });
};
