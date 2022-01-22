import { DataTable } from 'primereact/datatable';

type CardTableProps = {
    cards: Card[];
    loading: boolean;
    title: string;
};

export const CardTable = (props: CardTableProps) => {
    const { cards, loading, title } = props;

    console.log({ cards });

    return <DataTable value={cards} paginator header={<div>{title}</div>}></DataTable>;
};
