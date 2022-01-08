import { IUpdateDeckPayload } from '../../repositories/deck.repository';

export default function getMockDecks() {
    const decks: IUpdateDeckPayload[] = [
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000001',
            name: 'Testipakka 1',
            ownerId: 'owner-id-1',
            nsfw: true,
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000002',
            name: 'Testipakka 2',
            ownerId: 'owner-id-2',
            nsfw: true,
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
            name: 'Testipakka 3',
            ownerId: 'owner-id-3',
            nsfw: false,
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000004',
            name: 'Testipakka 4',
            ownerId: 'owner-id-4',
            nsfw: true,
        },
    ];

    return decks;
}
