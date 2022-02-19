import { useParams } from 'react-router';
import { CardpackContainer } from '../containers/CardpackContainer';

export const CardpackPage = () => {
    const { cardpackID } = useParams();

    return <CardpackContainer cardpackID={cardpackID} />;
};
