import { IUpdateDeckPayload } from '../../repositories/deck.repository';

export default function getMockDecks() {
    const decks: IUpdateDeckPayload[] = [
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000001',
            name: 'Testipakka 1',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000002',
            name: 'Testipakka 2',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
            name: 'Testipakka 3',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: false,
            languageCode: 'fi',
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000004',
            name: 'Testipakka 4',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        },
    ];

    return decks;
}
