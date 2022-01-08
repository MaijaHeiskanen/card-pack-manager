import { createDeck } from '../repositories/deck.repository';
import getMockDecks from './mockData/getMockDecks';

export const setMockData = () => {
    const fakeData = getMockDecks();

    fakeData.forEach((deck) => {
        createDeck(deck);
    });
};
