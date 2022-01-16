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
export interface ILoginPayload {
    tokenId: string;
}
export interface IRegisterPayload {
    tokenId: string;
    username: string;
}
export interface IUpdateDeckPayload {
    name: string;
    nsfw: boolean;
    ownerId: string;
    id: string;
}
export interface IUserResponse {
    user: {
        id: string;
        createdAt: string; // date-time
        updatedAt: string; // date-time
        email: string;
        username: string;
    } | null;
    accessToken: string | null;
}
export interface IValidateResponse {
    valid: boolean;
    status: string;
}
export interface IValidateTokenIdPayload {
    tokenId: string;
}
export interface IValidateUsernamePayload {
    username: string;
}
export interface PingResponse {
    message: string;
}
export interface User {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    email: string;
    username: string;
}

declare namespace Components {
    namespace Schemas {
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
        export interface ILoginPayload {
            tokenId: string;
        }
        export interface IRegisterPayload {
            tokenId: string;
            username: string;
        }
        export interface IUpdateDeckPayload {
            name: string;
            nsfw: boolean;
            ownerId: string;
            id: string;
        }
        export interface IUserResponse {
            user: {
                id: string;
                createdAt: string; // date-time
                updatedAt: string; // date-time
                email: string;
                username: string;
            } | null;
            accessToken: string | null;
        }
        export interface IValidateResponse {
            valid: boolean;
            status: string;
        }
        export interface IValidateTokenIdPayload {
            tokenId: string;
        }
        export interface IValidateUsernamePayload {
            username: string;
        }
        export interface PingResponse {
            message: string;
        }
        export interface User {
            id: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            email: string;
            username: string;
        }
    }
}
declare namespace Paths {
    namespace CreateCard {
        export type RequestBody = Components.Schemas.ICardPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Card;
        }
    }
    namespace CreateDeck {
        export type RequestBody = Components.Schemas.IDeckPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Deck;
        }
    }
    namespace GetCard {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = {
                id: string;
                createdAt: string; // date-time
                updatedAt: string; // date-time
                type: Components.Schemas.CardType;
                text: string;
                deckId: string;
                deck: Components.Schemas.Deck;
            } | null;
        }
    }
    namespace GetCardsByDeckId {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Card[];
        }
    }
    namespace GetDeck {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = {
                id: string;
                createdAt: string; // date-time
                updatedAt: string; // date-time
                name: string;
                ownerId: string;
                nsfw: boolean;
            } | null;
        }
    }
    namespace GetDecks {
        namespace Responses {
            export type $200 = Components.Schemas.Deck[];
        }
    }
    namespace GetMessage {
        namespace Responses {
            export type $200 = Components.Schemas.PingResponse;
        }
    }
    namespace LoginUser {
        export type RequestBody = Components.Schemas.ILoginPayload;
        namespace Responses {
            export type $200 = Components.Schemas.IUserResponse;
        }
    }
    namespace RegisterUser {
        export type RequestBody = Components.Schemas.IRegisterPayload;
        namespace Responses {
            export type $200 = Components.Schemas.IUserResponse;
        }
    }
    namespace UpdateDeck {
        export type RequestBody = Components.Schemas.IUpdateDeckPayload;
        namespace Responses {
            export type $200 = {
                id: string;
                createdAt: string; // date-time
                updatedAt: string; // date-time
                name: string;
                ownerId: string;
                nsfw: boolean;
            } | null;
        }
    }
    namespace ValidateTokenId {
        export type RequestBody = Components.Schemas.IValidateTokenIdPayload;
        namespace Responses {
            export type $200 = Components.Schemas.IValidateResponse;
        }
    }
    namespace ValidateUsername {
        export type RequestBody = Components.Schemas.IValidateUsernamePayload;
        namespace Responses {
            export type $200 = Components.Schemas.IValidateResponse;
        }
    }
}
