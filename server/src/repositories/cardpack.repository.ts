import { getManager, getRepository } from 'typeorm';
import { CardpackCodeAlreadyTakenError, CardpackNotFoundError } from '../errors/cardpackErrors';
import { UserNotFoundError } from '../errors/userErrors';
import { BlackCard, WhiteCard, Cardpack, Language, User } from '../models';
import { generateCardpackCode } from '../utils/generateCardpackCode';
import { getCardsCountsByCardpackId } from './card.repository';

export interface ICardpackPayload {
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    languageCode: string;
    code?: string;
}

export interface IUpdateCardpackPayload extends ICardpackPayload {
    id: string;
}

export const getCardpacks = async (where: Partial<Cardpack> = {}): Promise<Array<Cardpack>> => {
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
        where,
    });
    const cardpacks = [];

    for (let i = 0, len = cardpacksWithoutCounts.length; i < len; i++) {
        const cardpack = cardpacksWithoutCounts[i];

        const counts = await getCardsCountsByCardpackId(cardpack.id);

        cardpacks.push({ ...cardpack, ...counts });
    }

    return cardpacks;
};

export const validateCardpackCode = async (code: string) => {
    const cardpackRepository = getRepository(Cardpack);

    return Boolean(await cardpackRepository.findOne({ where: { code } }));
};

export const createCardpack = async (payload: ICardpackPayload): Promise<Cardpack> => {
    const cardpackRepository = getRepository(Cardpack);
    const cardpack = new Cardpack();
    // let code = payload.code;

    // if (!code) {
    //     for (let i = 0, len = 100; i < len; i++) {
    //         const generatedCode = generateCardpackCode();
    //         const codeAlreadyUsed = await validateCardpackCode(generatedCode);

    //         if (!codeAlreadyUsed) {
    //             code = generatedCode;

    //             break;
    //         }
    //     }
    // }

    // if (!code) {
    //     throw new Error('Could not generate cardpack code');
    // }

    return cardpackRepository.save({
        ...cardpack,
        ...payload,
        // code,
    });
};

export const getCardpack = async (id: string): Promise<Cardpack[]> => {
    const cardpackRepository = getRepository(Cardpack);
    const cardpack = await cardpackRepository.findOne(id, {
        relations: ['whiteCards', 'blackCards', 'user'],
    });

    if (!cardpack) {
        throw new CardpackNotFoundError(id);
    }

    return [cardpack];
};

export const updateCardpack = async (payload: IUpdateCardpackPayload): Promise<Cardpack> => {
    const id = payload.id;

    if (!id) {
        throw new CardpackNotFoundError(id);
    }

    const cardpackRepository = getRepository(Cardpack);
    const cardpack = await cardpackRepository.findOne({ id });

    if (!cardpack) {
        throw new CardpackNotFoundError(id);
    }

    const code = payload.id;
    const codeChanged = cardpack.code !== code;

    if (codeChanged && !(await validateCardpackCode(code))) {
        throw new CardpackCodeAlreadyTakenError();
    }

    return cardpackRepository.save({
        ...cardpack,
        ...payload,
    });
};

export const getCardpacksByUser = async (userId: string): Promise<Cardpack[]> => {
    const userRepository = getRepository(User);
    const user = userRepository.findOne(userId);

    if (!user) {
        throw new UserNotFoundError(userId);
    }

    const cardpacksByUser = await getCardpacks({ userId });

    return cardpacksByUser;
};
