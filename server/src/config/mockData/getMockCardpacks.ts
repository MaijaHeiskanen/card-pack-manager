import { IUpdateCardpackPayload } from '../../repositories/cardpack.repository';
import { addZeros4 } from './getMockCards';

export default function getMockCardpacks() {
    const AMOUNT_OF_CARDPACKS = 100;
    const cardpacks: IUpdateCardpackPayload[] = [
        {
            id: '619d8fb9-e580-45f8-ae7b-c2ae07000001',
            name: `Testipakka 1, jolla on paljon pidempi nimi kuin muilla`,
            description: 'Ekan testipakan kuvaus. Tää on eri käyttäjän kuin muut. Ja tässä on enemmän sisältöä kans',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5d',
            nsfw: true,
            languageCode: 'fi',
        },
    ];

    for (let i = 2, len = AMOUNT_OF_CARDPACKS + 1; i < len; i++) {
        cardpacks.push({
            id: `619d8fb9-e580-45f8-ae7b-c2ae0700${addZeros4(i)}`,
            name: `Testipakka ${i}`,
            description: 'Testipakan kuvaus',
            userId: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            nsfw: true,
            languageCode: 'fi',
        });
    }
    return cardpacks;
}
