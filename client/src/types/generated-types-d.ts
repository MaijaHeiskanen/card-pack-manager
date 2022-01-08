export type CARDTYPESBLACK = 'black';
export type CARDTYPESWHITE = 'white';
export interface Card {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    type: CardType;
    text: string;
    deckId: string;
    deck: Deck;
}
export type CardType = CARDTYPESWHITE | CARDTYPESBLACK;
export interface Deck {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    name: string;
    ownerId: string;
    nsfw: boolean;
}
export interface ICardPayload {
    type: CardType;
    text: string;
    deckId: string;
}
export interface IDeckPayload {
    name: string;
    nsfw: boolean;
    ownerId: string;
}
export interface IUpdateDeckPayload {
    name: string;
    nsfw: boolean;
    ownerId: string;
    id: string;
}
export interface PingResponse {
    message: string;
}
