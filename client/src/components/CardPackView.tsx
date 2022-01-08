import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Deck } from '../types/generated-types-d';

type CardPackViewTableProps = {
    cardPacks: Deck[];
    loading: boolean;
};

export const CardPackViewTable = (props: CardPackViewTableProps) => {
    const { cardPacks, loading } = props;

    const [layout, setLayout] = useState('grid');

    const itemTemplate = (cardpack: Deck, layout: string) => {
        if (!cardpack) {
            return;
        }

        if (layout === 'list') return renderListItem(cardpack);
        else if (layout === 'grid') return renderGridItem(cardpack);
    };

    const renderGridItem = (data: Deck) => {
        return (
            <div className="p-col-12 p-md-4">
                {data.name}
                <Link to={`/cardpack/${data.id}`}>{data.id}</Link>
            </div>
        );
    };

    const renderListItem = (data: Deck) => {
        return (
            <div className="p-col-12">
                {data.name}
                <Link to={`/cardpack/${data.id}`}>{data.id}</Link>
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    Tekstiä
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    };

    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <DataView
            value={cardPacks}
            layout={layout}
            header={renderHeader()}
            itemTemplate={itemTemplate}
            paginator
            rows={3}
        />
    );
};
