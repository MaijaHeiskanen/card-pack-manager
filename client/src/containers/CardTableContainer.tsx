import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardTable } from '../components/CardTable';
import { Card, Cardpack } from '../types/generated-types-d';

type CardTableContainerProps = {
    cardpackID?: string;
};

export const CardTableContainer = (props: CardTableContainerProps) => {
    const { cardpackID } = props;
    const [cardpack, setCardpack] = useState<Cardpack>();
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        axios.get(`/cardpacks/${cardpackID}`).then((response) => {
            console.log('/cardpacks/', response.data);

            setCardpack(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`/cards/cardpack/${cardpackID}`).then((response) => {
            console.log('/cards/cardpack/', response.data);

            setCards(response.data);
        });
    }, []);

    if (!cardpackID || !cards || !cardpack) {
        return <span>loading...</span>;
    }

    if (cards.length === 0) {
        return <span>This cardpack does not have any cards yet</span>;
    }

    return <CardTable cards={cards} cardpackName={cardpack.name} loading={false} />;
};
