import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cardpack } from '../types/generated-types-d';

type CardpackViewTableProps = {
    cardpacks: Cardpack[];
    loading: boolean;
};

export const CardpackViewTable = (props: CardpackViewTableProps) => {
    const { cardpacks, loading } = props;

    const [layout, setLayout] = useState('grid');

    const itemTemplate = (cardpack: Cardpack, layout: string) => {
        if (!cardpack) {
            return;
        }

        if (layout === 'list') return renderListItem(cardpack);
        else if (layout === 'grid') return renderGridItem(cardpack);
    };

    const renderGridItem = (data: Cardpack) => {
        return (
            <div className="p-col-12 p-md-4">
                {data.name}
                <Link className="text-primary" to={`/cardpack/${data.id}`}>
                    {data.id}
                </Link>
            </div>
        );
    };

    const renderListItem = (data: Cardpack) => {
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
            value={cardpacks}
            layout={layout}
            header={renderHeader()}
            itemTemplate={itemTemplate}
            paginator
            rows={3}
        />
    );
};
