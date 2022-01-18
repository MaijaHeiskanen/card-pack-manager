import { getRepository } from 'typeorm';
import { User } from '../models';
import { createCard } from '../repositories/card.repository';
import { createDeck } from '../repositories/deck.repository';
import { createLanguage } from '../repositories/language.repository';
import { addMockDataUser } from '../repositories/user.repository';
import getMockCards from './mockData/getMockCards';
import getMockDecks from './mockData/getMockDecks';
import { getMockLanguages } from './mockData/getMockLanguages';
import getMockUsers from './mockData/getMockUsers';

const setLanguageData = async () => {
    const languageMockData = getMockLanguages();

    languageMockData.forEach((language) => {
        console.log('add language');
        createLanguage(language);
    });
};

const setUserData = async () => {
    const mockUserData = getMockUsers();

    mockUserData.forEach((user) => {
        console.log('add user');
        addMockDataUser(user);
    });
};

const setDeckData = async () => {
    const userRepository = getRepository(User);

    const user = await userRepository.find();
    const mockDeckData = getMockDecks();

    mockDeckData.forEach((deck) => {
        if (user[0]) {
            deck.userId = user[0].id;
        }
        console.log('add deck');
        createDeck(deck);
    });
};

const setCardData = async () => {
    const mockCardData = getMockCards();

    mockCardData.forEach((card) => {
        console.log('add card');
        createCard(card);
    });
};

export const setMockData = async () => {
    await setLanguageData();

    setTimeout(async () => {
        console.log('languages done');

        await setUserData();
        setTimeout(async () => {
            console.log('users done');

            await setDeckData();
            setTimeout(async () => {
                console.log('decks done');

                await setCardData();
                setTimeout(() => {
                    console.log('cards done');
                }, 500);
            }, 500);
        }, 500);
    }, 500);
};
