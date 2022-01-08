import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardPackViewTable } from '../components/CardPackView';
import { Deck } from '../types/generated-types-d';

type CardPackViewContainerProps = {};

export const CardPackViewContainer = (props: CardPackViewContainerProps) => {
    const [cardPacks, setCardPacks] = useState<Deck[]>();

    useEffect(() => {
        axios.get(`/decks`).then((response) => {
            console.log('/decks/', response.data);

            setCardPacks(response.data);
        });
    }, []);

    if (!cardPacks) {
        return <span>loading...</span>;
    }

    return <CardPackViewTable cardPacks={cardPacks} loading={false} />;
};
