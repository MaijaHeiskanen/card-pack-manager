import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardTable } from '../components/CardTable';
import { Card, Deck } from '../types/generated-types-d';

type CardTableContainerProps = {
    cardpackID?: string;
};

export const CardTableContainer = (props: CardTableContainerProps) => {
    const { cardpackID } = props;
    const [deck, setDeck] = useState<Deck>();
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        axios.get(`/decks/${cardpackID}`).then((response) => {
            console.log('/decks/', response.data);

            setDeck(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`/cards/deck/${cardpackID}`).then((response) => {
            console.log('/cards/deck/', response.data);

            setCards(response.data);
        });
    }, []);

    if (!cardpackID || !cards || !deck) {
        return <span>loading...</span>;
    }

    if (cards.length === 0) {
        return <span>This cardpack does not have any cards yet</span>;
    }

    return <CardTable cards={cards} cardpackName={deck.name} loading={false} />;
};
