import axios from 'axios';
import { useEffect, useState } from 'react';

export const SearchPage = (props: object) => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        axios.get('/decks').then((response) => {
            console.log(response.data);

            setDecks(response.data);
        });
    }, []);

    const renderDecks = (
        decks: { name: string; id: string; nsfw: boolean; createdAt: Date; updatedAt: Date; ownerId: string }[]
    ) => {
        let i = 1;
        const renderedDecks = decks.map((deck) => {
            const { name, id, nsfw, createdAt, updatedAt, ownerId } = deck;

            return (
                <div key={i++}>
                    <div>{deck.name}</div>
                    <div>{deck.id}</div>
                    <div>{deck.nsfw}</div>
                    <div>{deck.createdAt}</div>
                    <div>{deck.updatedAt}</div>
                    <div>{deck.ownerId}</div>
                    <br />
                </div>
            );
        });

        console.log({ renderedDecks });

        return renderedDecks;
    };

    return <div>{renderDecks(decks)}</div>;
    // return <div>Search page</div>;
};
