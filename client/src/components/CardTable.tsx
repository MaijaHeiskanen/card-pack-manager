import { DataTable } from 'primereact/datatable';

type CardTableProps = {
    cards: Card[];
    loading: boolean;
    cardpackName: string;
};

export const CardTable = (props: CardTableProps) => {
    const { cards, loading, cardpackName } = props;

    return <DataTable value={cards} paginator header={<div>{cardpackName}</div>}></DataTable>;
};
