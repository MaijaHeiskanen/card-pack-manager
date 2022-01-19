import { CardpackViewTable } from '../components/CardpackView';
import { Cardpack } from '../types/generated-types-d';

interface CardpackViewContainerProps {
    cardpacks: Cardpack[] | undefined;
}

export const CardpackViewContainer = (props: CardpackViewContainerProps) => {
    if (!props.cardpacks) {
        return <span>loading...</span>;
    }

    return <CardpackViewTable cardpacks={props.cardpacks} loading={false} />;
};
