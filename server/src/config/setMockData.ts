import { getRepository } from 'typeorm';
import { User } from '../models';
import { createCard } from '../repositories/card.repository';
import { createCardpack } from '../repositories/cardpack.repository';
import { createLanguage } from '../repositories/language.repository';
import { addMockDataUser } from '../repositories/user.repository';
import getMockCards from './mockData/getMockCards';
import getMockCardpacks from './mockData/getMockCardpacks';
import { getMockLanguages } from './mockData/getMockLanguages';
import getMockUsers from './mockData/getMockUsers';

// Maybe should use bulk insert instead of this, but on the other hand,
// this is mock data and does not cause issues at the moment, so...

const setLanguageData = async () => {
    const languageMockData = getMockLanguages();

    const promises = languageMockData.map((language) => {
        return createLanguage(language);
    });

    return await Promise.all(promises);
};

const setUserData = async () => {
    const mockUserData = getMockUsers();

    const promises = mockUserData.map((user) => {
        return addMockDataUser(user);
    });

    return await Promise.all(promises);
};

const setCardpackData = async () => {
    const userRepository = getRepository(User);

    const user = await userRepository.find();
    const mockCardpackData = getMockCardpacks();

    const promises = mockCardpackData.map((cardpack) => {
        if (user[0]) {
            cardpack.userId = user[0].id;
        }
        return createCardpack(cardpack);
    });

    return await Promise.all(promises);
};

const setCardData = async () => {
    const mockCardData = getMockCards();

    const promises = mockCardData.map((card) => {
        return createCard(card);
    });

    return await Promise.all(promises);
};

export const setMockData = async () => {
    await setLanguageData();
    await setUserData();
    await setCardpackData();
    await setCardData();
};
