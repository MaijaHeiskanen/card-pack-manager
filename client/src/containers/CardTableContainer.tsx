import { useParams } from 'react-router';
import { CardTable } from '../components/CardTable';

type CardTableContainerProps = {
    cardpackID?: string;
};

export const CardTableContainer = (props: CardTableContainerProps) => {
    const { cardpackID } = props;

    const cards: Card[] = [
        {
            id: '1',
            text: 'Aamulla _.',
            type: 'white',
        },
    ];

    if (!cardpackID) {
        return <span>'loading'</span>;
    }

    return <CardTable cards={cards} cardpackName={'Korttipakka jolla on nimi'} loading={false} />;
};
