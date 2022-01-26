import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { CardTable } from '../components/CardTable';
import { CardpackService } from '../services/CardpackService';
import { Card, Cardpack } from '../types/generated-types-d';
import useService from '../hooks/useService';
import { useTranslation } from 'react-i18next';

type CardTableContainerProps = {
    cardpackID?: string;
};

interface CardpackWithCards extends Cardpack {
    blackCards: Card[];
    whiteCards: Card[];
}

export const CardTableContainer = (props: CardTableContainerProps) => {
    const { cardpackID } = props;
    const { t } = useTranslation();
    const cardpackService = useService(new CardpackService());
    const [cardpack, setCardpack] = useState<CardpackWithCards>();
    const [whiteCards, setWhiteCards] = useState<Card[]>([]);
    const [blackCards, setBlackCards] = useState<Card[]>([]);

    const setCardpackDataSuccessful = (response: AxiosResponse<CardpackWithCards[]>) => {
        console.log('res', { response });

        setCardpack(response.data[0]);
        setWhiteCards(response.data[0].whiteCards);
        setBlackCards(response.data[0].blackCards);
    };

    useEffect(() => {
        if (cardpackID) {
            cardpackService.get<CardpackWithCards>([cardpackID], setCardpackDataSuccessful);
        }
    }, [cardpackService, cardpackID]);

    if (!cardpackID || !cardpack) {
        return <span>loading...</span>;
    }

    return (
        <div>
            <CardTable cards={whiteCards} title={t('whiteCards')} loading={false} />
            <CardTable cards={blackCards} title={t('blackCards')} loading={false} />
        </div>
    );
};
