import { IUpdateCardPayload } from '../../repositories/card.repository';
import { CARDTYPES } from '../../types/enums/card';

export default function getMockCards() {
    const decks: IUpdateCardPayload[] = [
        {
            id: '719d8fb9-e580-45f8-ae7b-c2ae07000001',
            text: 'Testikortti 1 _.',
            type: CARDTYPES.WHITE,
            deckId: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
        },
        {
            id: '719d8fb9-e580-45f8-ae7b-c2ae07000002',
            text: 'Testikortti 2 _.',
            type: CARDTYPES.WHITE,
            deckId: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
        },
        {
            id: '719d8fb9-e580-45f8-ae7b-c2ae07000003',
            text: 'Testikortti (musta).',
            type: CARDTYPES.BLACK,
            deckId: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
        },
        {
            id: '719d8fb9-e580-45f8-ae7b-c2ae07000004',
            text: 'Testikortti 4 _.',
            type: CARDTYPES.WHITE,
            deckId: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
        },
    ];

    return decks;
}
