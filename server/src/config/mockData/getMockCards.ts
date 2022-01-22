import { IUpdateCardPayload } from '../../repositories/card.repository';
import { CARDTYPES } from '../../types/enums/card';

export const addZeros4 = (number: number) => {
    if (number < 10) {
        return `000${number}`;
    }
    if (number < 100) {
        return `00${number}`;
    }
    if (number < 1000) {
        return `0${number}`;
    }
    return `${number}`;
};

export const addZeros3 = (number: number) => {
    if (number < 10) {
        return `00${number}`;
    }
    if (number < 100) {
        return `0${number}`;
    }
    return `${number}`;
};

export default function getMockCards() {
    const AMOUNT_PER_CARDPACK = 100;
    const AMOUNT_OF_CARDPACKS = 100;
    const cards: IUpdateCardPayload[] = [];
    const baseCardId = '719d8fb9-e580-45f8-ae7b-c2ae';

    const cardpackIds = [];

    for (let i = 1, len = AMOUNT_OF_CARDPACKS + 1; i < len; i++) {
        cardpackIds.push(`619d8fb9-e580-45f8-ae7b-c2ae0700${addZeros4(i)}`);
    }

    for (let i = 1, len = cardpackIds.length + 1; i < len; i++) {
        const cardpackId = cardpackIds[i - 1];

        for (let j = 1, len2 = AMOUNT_PER_CARDPACK + 1; j < len2; j++) {
            cards.push(
                {
                    id: `${baseCardId}0${addZeros3(i)}${addZeros4(j)}`,
                    text: `Testikortti ${j}`,
                    type: CARDTYPES.WHITE,
                    cardpackId,
                },
                {
                    id: `${baseCardId}1${addZeros3(i)}${addZeros4(j)}`,
                    text: `Testikortti ${j} _.`,
                    type: CARDTYPES.BLACK,
                    cardpackId,
                }
            );
        }
    }

    return cards;
}
