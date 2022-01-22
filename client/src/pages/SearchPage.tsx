import { CardpackListContainer } from '../containers/CardpackListContainer';
import { Cardpack } from '../types/generated-types-d';

interface SearchPageProps {
    cardpacks: Cardpack[] | undefined;
}

export const SearchPage = (props: SearchPageProps) => {
    return <CardpackListContainer cardpacks={props.cardpacks} />;
};
