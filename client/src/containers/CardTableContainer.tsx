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
    const [whiteCards, setWhiteCards] = useState<Card[]>([]);
    const [blackCards, setBlackCards] = useState<Card[]>([]);

    useEffect(() => {
        axios.get(`/cardpacks/${cardpackID}`).then((response) => {
            console.log('/cardpacks/', response.data);

            setCardpack(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`/cards/cardpack/${cardpackID}`).then((response) => {
            console.log('/cards/cardpack/', response.data);

            setWhiteCards(response.data.whiteCards);
            setBlackCards(response.data.blackCards);
        });
    }, []);

    if (!cardpackID || !cardpack) {
        return <span>loading...</span>;
    }

    return (
        <div>
            <CardTable cards={whiteCards} title={'a'} loading={false} />
            <CardTable cards={blackCards} title={'b'} loading={false} />
        </div>
    );
};
