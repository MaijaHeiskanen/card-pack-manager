import { createCard } from '../repositories/card.repository';
import { createDeck } from '../repositories/deck.repository';
import getMockCards from './mockData/getMockCards';
import getMockDecks from './mockData/getMockDecks';

export const setMockData = () => {
    const mockDeckData = getMockDecks();

    mockDeckData.forEach((deck) => {
        createDeck(deck);
    });

    const mockCardData = getMockCards();

    mockCardData.forEach((card) => {
        createCard(card);
    });
};
