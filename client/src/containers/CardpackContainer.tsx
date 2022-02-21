import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { CardTable } from '../components/CardTable';
import { CardpackService, CardpackWithCards } from '../services/CardpackService';
import { Card } from '../types/generated-types-d';
import useService from '../hooks/useService';
import { useTranslation } from 'react-i18next';
import { ListWrapper } from '../wrappers/ListWrapper';
import { CardpackInfo } from '../components/CardpackInfo';
import { Loading } from '../components/Loading';

type CardTableContainerProps = {
    cardpackID?: string;
};

export const CardpackContainer = (props: CardTableContainerProps) => {
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
        return <Loading />;
    }

    const { name, user, languageCode, nsfw, description, code } = cardpack;

    return (
        <div className="flex flex-column align-items-center">
            <ListWrapper className="p-3 mb-6">
                <CardpackInfo
                    name={name}
                    user={user}
                    languageCode={languageCode}
                    nsfw={nsfw}
                    description={description}
                    code={code}
                    whiteCardsCount={whiteCards.length}
                    blackCardsCount={blackCards.length}
                />
            </ListWrapper>
            <ListWrapper className="mb-6">
                <CardTable cards={whiteCards} title={t('whiteCards')} loading={false} />
            </ListWrapper>
            <ListWrapper>
                <CardTable cards={blackCards} title={t('blackCards')} loading={false} />
            </ListWrapper>
        </div>
    );
};
