import { useParams } from 'react-router';
import { CardTableContainer } from '../containers/CardTableContainer';

export const CardPackPage = () => {
    const { cardpackID } = useParams();

    return <CardTableContainer cardpackID={cardpackID} />;
};
