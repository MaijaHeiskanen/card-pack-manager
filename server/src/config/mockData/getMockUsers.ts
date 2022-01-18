import { IUpdateUserPayload } from '../../repositories/user.repository';

export interface IUserMockData extends IUpdateUserPayload {
    email: string;
    id: string;
}

export default function getMockUsers() {
    const decks: IUserMockData[] = [
        {
            id: '29c01432-65fb-4eb9-95e0-150a331efe5c',
            email: 'tester.1@email.com',
            username: 'Tester1',
        },
    ];

    return decks;
}
