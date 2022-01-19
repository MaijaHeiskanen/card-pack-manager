import { getRepository } from 'typeorm';
import { Cardpack } from '../models';

export interface ICardpackPayload {
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    languageCode: string;
}

export interface IUpdateCardpackPayload extends ICardpackPayload {
    id: string;
}

export const getCardpacks = async (): Promise<Array<Cardpack>> => {
    const cardpackRepository = getRepository(Cardpack);

    return cardpackRepository.find();
};

export const createCardpack = async (payload: ICardpackPayload): Promise<Cardpack> => {
    const cardpackRepository = getRepository(Cardpack);
    const cardpack = new Cardpack();

    return cardpackRepository.save({
        ...cardpack,
        ...payload,
    });
};

export const getCardpack = async (id: string): Promise<Cardpack | null> => {
    const cardpackRepository = getRepository(Cardpack);
    const cardpack = await cardpackRepository.findOne({ id });

    if (!cardpack) {
        return null;
    }

    return cardpack;
};

export const updateCardpack = async (payload: IUpdateCardpackPayload): Promise<Cardpack | null> => {
    const id = payload.id;

    if (!id) {
        return null;
    }

    const cardpackRepository = getRepository(Cardpack);

    const cardpackExists = await !!cardpackRepository.findOne({ id });

    if (!cardpackExists) {
        return null;
    }

    const cardpack = new Cardpack();

    return cardpackRepository.save({
        ...cardpack,
        ...payload,
    });
};
