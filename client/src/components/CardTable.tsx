import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useTranslation } from 'react-i18next';

type CardTableProps = {
    cards: Card[];
    loading: boolean;
    title: string;
};

export const CardTable = (props: CardTableProps) => {
    const { cards, title } = props;
    const { t } = useTranslation();

    console.log({ cards });

    return (
        <DataTable
            value={cards}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            header={<div>{title}</div>}
        >
            <Column field="text" header={t('name')} style={{ width: '100%' }}></Column>
        </DataTable>
    );
};
