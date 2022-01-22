import { getManager, getRepository } from 'typeorm';
import { BlackCard, WhiteCard, Cardpack, Language, User } from '../models';
import { getCardsCountsByCardpackId } from './card.repository';

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
    const blackCardRepository = getRepository(WhiteCard);

    const blackCardsCount = await blackCardRepository.count();
    console.log(blackCardsCount);

    // return getManager()
    //     .createQueryBuilder(Cardpack, 'cardpack')
    //     .loadRelationCountAndMap('cardpack.aaa', 'cardpack.whiteCards')
    //     .getMany();

    // return getManager()
    //     .createQueryBuilder(Cardpack, 'cardpack')
    //     .select('cardpack.id', 'id')
    //     .addSelect('cardpack.name', 'name')
    //     .addSelect('cardpack.description', 'description')
    //     .addSelect('user.username', 'username')
    //     .addSelect('language.code', 'languageCode')
    //     .leftJoin(User, 'user', 'cardpack.userId = user.id')
    //     .leftJoin(Language, 'language', 'cardpack.languageCode = language.code')
    //     .leftJoin(BlackCard, 'blackCard', 'cardpack.id = blackCard.cardpackId')
    //     .leftJoin(WhiteCard, 'whiteCard', 'cardpack.id = whiteCard.cardpackId')
    //     .addSelect('COUNT(blackCard.cardpackId)', 'blackCardCount')
    //     .addSelect('COUNT(whiteCard.cardpackId)', 'whiteCardCount')
    //     .groupBy('cardpack.id')
    //     .addGroupBy('user.username')
    //     .addGroupBy('language.code')
    //     .orderBy('cardpack.name')
    //     .getRawMany();

    // return getManager()
    //     .createQueryBuilder(Cardpack, 'cardpack')
    //     .select('cardpack.id', 'id')
    //     .addSelect('cardpack.name', 'name')
    //     .addSelect('cardpack.description', 'description')
    //     .addSelect('user.username', 'username')
    //     .addSelect('language.code', 'languageCode')
    //     .addSelect('SUM(card.userId)')
    //     .innerJoin(User, 'user', 'cardpack.userId = user.id')
    //     .innerJoin(Language, 'language', 'cardpack.languageCode = language.code')
    //     .groupBy('cardpack.id')
    //     .addGroupBy('user.username')
    //     .addGroupBy('language.code')
    //     .getRawMany();

    // const cardpacks = getManager()
    //     .createQueryBuilder(Cardpack, 'cardpack')
    //     .select('cardpack.id', 'id')
    //     .select('cardpack.name', 'name')
    //     .select('cardpack.description', 'description')
    //     .addSelect('user.username', 'username')
    //     // .addSelect('language.code', 'languageCode')
    //     // .addSelect('language.native', 'languageNative')
    //     .addSelect('language')
    //     .innerJoin(User, 'user', 'cardpack.userId = user.id')
    //     .innerJoin(Language, 'language', 'cardpack.languageCode = language.code')
    //     // .groupBy('cardpack.id')
    //     .getMany();

    const cardpacksWithoutCounts = await cardpackRepository.find({
        relations: ['language', 'user'],
        order: { name: 'ASC' },
    });
    const cardpacks = [];

    for (let i = 0, len = cardpacksWithoutCounts.length; i < len; i++) {
        const cardpack = cardpacksWithoutCounts[i];

        const counts = await getCardsCountsByCardpackId(cardpack.id);

        cardpacks.push({ ...cardpack, ...counts });
    }

    return cardpacks;
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
