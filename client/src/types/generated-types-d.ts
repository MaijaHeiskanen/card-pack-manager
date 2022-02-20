export interface BlackCard {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    type: CardType;
    text: string;
    cardpackId: string;
    cardpack: Cardpack;
}
export type CARDTYPESBLACK = 'black';
export type CARDTYPESWHITE = 'white';
export interface Card {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    type: CardType;
    text: string;
    cardpackId: string;
}
export type CardType = CARDTYPESWHITE | CARDTYPESBLACK;
export interface Cardpack {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    code: string;
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    user: User;
    languageCode: string;
    language: Language;
    blackCards: BlackCard[];
    whiteCards: WhiteCard[];
}
export interface CardsOfCardpack {
    whiteCards: WhiteCard[];
    blackCards: BlackCard[];
}
export interface ICardPayload {
    type: CardType;
    text: string;
    cardpackId: string;
}
export interface ICardpackPayload {
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    languageCode: string;
    code?: string;
}
export interface ILoginPayload {
    tokenId: string;
}
export interface IRegisterPayload {
    tokenId: string;
    username: string;
}
export interface IUpdateCardpackPayload {
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    languageCode: string;
    code?: string;
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
export interface Language {
    code: string;
    name: string;
    native: string;
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
export interface WhiteCard {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    type: CardType;
    text: string;
    cardpackId: string;
    cardpack: Cardpack;
}

declare namespace Components {
    namespace Schemas {
        export interface BlackCard {
            id: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            type: CardType;
            text: string;
            cardpackId: string;
            cardpack: Cardpack;
        }
        export type CARDTYPESBLACK = 'black';
        export type CARDTYPESWHITE = 'white';
        export interface Card {
            id: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            type: CardType;
            text: string;
            cardpackId: string;
        }
        export type CardType = CARDTYPESWHITE | CARDTYPESBLACK;
        export interface Cardpack {
            id: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            code: string;
            name: string;
            description: string;
            nsfw: boolean;
            userId: string;
            user: User;
            languageCode: string;
            language: Language;
            blackCards: BlackCard[];
            whiteCards: WhiteCard[];
        }
        export interface CardsOfCardpack {
            whiteCards: WhiteCard[];
            blackCards: BlackCard[];
        }
        export interface ICardPayload {
            type: CardType;
            text: string;
            cardpackId: string;
        }
        export interface ICardpackPayload {
            name: string;
            description: string;
            nsfw: boolean;
            userId: string;
            languageCode: string;
            code?: string;
        }
        export interface ILoginPayload {
            tokenId: string;
        }
        export interface IRegisterPayload {
            tokenId: string;
            username: string;
        }
        export interface IUpdateCardpackPayload {
            name: string;
            description: string;
            nsfw: boolean;
            userId: string;
            languageCode: string;
            code?: string;
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
        export interface Language {
            code: string;
            name: string;
            native: string;
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
        export interface WhiteCard {
            id: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            type: CardType;
            text: string;
            cardpackId: string;
            cardpack: Cardpack;
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
    namespace CreateCardpack {
        namespace Parameters {
            export type User = string;
        }
        export interface PathParameters {
            user: Parameters.User;
        }
        export type RequestBody = Components.Schemas.ICardpackPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Cardpack;
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
                cardpackId: string;
            } | null;
        }
    }
    namespace GetCardpack {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Cardpack[];
        }
    }
    namespace GetCardpacks {
        namespace Responses {
            export type $200 = Components.Schemas.Cardpack[];
        }
    }
    namespace GetCardpacksByUser {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Cardpack[];
        }
    }
    namespace GetCardsByCardpackId {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CardsOfCardpack;
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
    namespace UpdateCardpack {
        namespace Parameters {
            export type User = string;
        }
        export interface PathParameters {
            user: Parameters.User;
        }
        export type RequestBody = Components.Schemas.IUpdateCardpackPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Cardpack;
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
