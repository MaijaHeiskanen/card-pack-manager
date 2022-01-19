import { IUpdateCardpackPayload } from '../../repositories/cardpack.repository';

export default function getMockCardpacks() {
    const cardpacks: IUpdateCardpackPayload[] = [
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000001',
            name: 'Testipakka 1',
            description: 'Testipakka ykkösen kuvaus',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000002',
            name: 'Testipakka 2',
            description: '',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000003',
            name: 'Testipakka 3',
            description: '',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: false,
            languageCode: 'fi',
        },
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000004',
            name: 'Testipakka 4',
            description: '',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        },
    ];

    return cardpacks;
}
