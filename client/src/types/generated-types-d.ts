export type CARDTYPESBLACK = 'black';
export type CARDTYPESWHITE = 'white';
export interface Card {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    type: CardType;
    text: string;
    cardpackId: string;
    cardpack: Cardpack;
}
export type CardType = CARDTYPESWHITE | CARDTYPESBLACK;
export interface Cardpack {
    id: string;
    createdAt: string; // date-time
    updatedAt: string; // date-time
    name: string;
    description: string;
    nsfw: boolean;
    userId: string;
    user: User;
    languageCode: string;
    language: Language;
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
            cardpackId: string;
            cardpack: Cardpack;
        }
        export type CardType = CARDTYPESWHITE | CARDTYPESBLACK;
        export interface Cardpack {
            id: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            name: string;
            description: string;
            nsfw: boolean;
            userId: string;
            user: User;
            languageCode: string;
            language: Language;
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
                cardpack: Components.Schemas.Cardpack;
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
            export type $200 = {
                id: string;
                createdAt: string; // date-time
                updatedAt: string; // date-time
                name: string;
                description: string;
                nsfw: boolean;
                userId: string;
                user: Components.Schemas.User;
                languageCode: string;
                language: Components.Schemas.Language;
            } | null;
        }
    }
    namespace GetCardpacks {
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
            export type $200 = Components.Schemas.Card[];
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
        export type RequestBody = Components.Schemas.IUpdateCardpackPayload;
        namespace Responses {
            export type $200 = {
                id: string;
                createdAt: string; // date-time
                updatedAt: string; // date-time
                name: string;
                description: string;
                nsfw: boolean;
                userId: string;
                user: Components.Schemas.User;
                languageCode: string;
                language: Components.Schemas.Language;
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
