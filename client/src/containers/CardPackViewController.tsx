import { CardPackViewTable } from '../components/CardPackView';
import { Deck } from '../types/generated-types-d';

interface CardPackViewContainerProps {
    cardPacks: Deck[] | undefined;
}

export const CardPackViewContainer = (props: CardPackViewContainerProps) => {
    if (!props.cardPacks) {
        return <span>loading...</span>;
    }

    return <CardPackViewTable cardPacks={props.cardPacks} loading={false} />;
};
