import { useParams } from 'react-router';
import { CardTableContainer } from '../containers/CardTableContainer';

export const CardPackPage = () => {
    const { cardpackID } = useParams();

    // return <div>Card pack page {cardpackID}</div>;

    return <CardTableContainer cardpackID={cardpackID} />;
};
