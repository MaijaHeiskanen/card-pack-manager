import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Deck } from '../types/generated-types-d';

export const SearchPage = (props: object) => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        axios.get('/decks').then((response) => {
            console.log(response.data);

            setDecks(response.data);
        });
    }, []);

    const renderDecks = (decks: Deck[]) => {
        let i = 1;
        const renderedDecks = decks.map((deck) => {
            const { name, id, nsfw, createdAt, updatedAt, ownerId } = deck;

            return (
                <div key={i++}>
                    <div>{name}</div>
                    <div className="bg-primary">
                        <Link to={`/cardpack/${id}`}>{id}</Link>
                    </div>
                    <div>{nsfw}</div>
                    <div>{createdAt}</div>
                    <div>{updatedAt}</div>
                    <div>{ownerId}</div>
                    <br />
                </div>
            );
        });

        console.log({ renderedDecks });

        return renderedDecks;
    };

    return <div>{renderDecks(decks)}</div>;
};
