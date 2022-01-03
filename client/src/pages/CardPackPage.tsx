import { useParams } from 'react-router';

export const CardPackPage = (props: object) => {
    const { cardpackID } = useParams();

    return <div>Card pack page {cardpackID}</div>;
};
