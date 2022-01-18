import { CardPackViewContainer } from '../containers/CardPackViewController';
import { Deck } from '../types/generated-types-d';

interface SearchPageProps {
    cardPacks: Deck[] | undefined;
}

export const SearchPage = (props: SearchPageProps) => {
    return <CardPackViewContainer cardPacks={props.cardPacks} />;
};
