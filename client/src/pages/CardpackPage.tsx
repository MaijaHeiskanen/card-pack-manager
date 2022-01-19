import { useParams } from 'react-router';
import { CardTableContainer } from '../containers/CardTableContainer';

export const CardpackPage = () => {
    const { cardpackID } = useParams();

    return <CardTableContainer cardpackID={cardpackID} />;
};
