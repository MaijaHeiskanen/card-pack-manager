import { CardpackViewContainer } from '../containers/CardpackViewController';
import { Cardpack } from '../types/generated-types-d';

interface SearchPageProps {
    cardpacks: Cardpack[] | undefined;
}

export const SearchPage = (props: SearchPageProps) => {
    return <CardpackViewContainer cardpacks={props.cardpacks} />;
};
