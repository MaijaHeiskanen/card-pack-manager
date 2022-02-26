import { useParams } from 'react-router';
import { CardpackContainer } from '../containers/CardpackContainer';

export const CardpackPage = () => {
    const { cardpackId } = useParams();

    return <CardpackContainer cardpackId={cardpackId} />;
};
