import { Cardpack } from '../types/generated-types-d';
import { Skeleton } from 'primereact/skeleton';
import { DataTable, DataTableSelectionChangeParams } from 'primereact/datatable';
import { useTranslation } from 'react-i18next';
import { Column } from 'primereact/column';

type CardpackListProps = {
    cardpacks: Cardpack[] | undefined;
    onClickRow?: (data: DataTableSelectionChangeParams) => void;
};

const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export const CardpackList = (props: CardpackListProps) => {
    const { t } = useTranslation();
    const { cardpacks } = props;

    const onSelectionChange = (e: DataTableSelectionChangeParams) => {
        if (props.onClickRow) props.onClickRow(e);
    };

    const skeletonItemTemplate = () => {
        return <Skeleton height="1.2rem">&nbsp;</Skeleton>;
    };

    if (!cardpacks) {
        return (
            <DataTable
                value={skeletonData}
                onSelectionChange={(e) => console.log(e.value)}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate={t('stringTemplate.pageReportTemplateCardpack')}
                dataKey="id"
                // size="small"
                selectionMode="single"
                responsiveLayout="scroll"
            >
                <Column header={t('name')} style={{ width: '20%' }} body={skeletonItemTemplate}></Column>
                <Column header={t('description')} style={{ width: '30%' }} body={skeletonItemTemplate}></Column>
                <Column header={t('language')} style={{ width: '10%' }} body={skeletonItemTemplate}></Column>
                <Column header={t('amountOfBlackCards')} style={{ width: '15%' }} body={skeletonItemTemplate}></Column>
                <Column header={t('amountOfWhiteCards')} style={{ width: '15%' }} body={skeletonItemTemplate}></Column>
                <Column header={t('user')} style={{ width: '10%' }} body={skeletonItemTemplate}></Column>
            </DataTable>
        );
    }

    return (
        <DataTable
            value={cardpacks}
            onSelectionChange={onSelectionChange}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate={t('stringTemplate.pageReportTemplateCardpack')}
            dataKey="id"
            // size="small"
            selectionMode="single"
            responsiveLayout="scroll"
        >
            <Column field="name" header={t('name')} style={{ width: '15%' }}></Column>
            <Column field="description" header={t('description')} style={{ width: '25%' }}></Column>
            <Column field="language.native" header={t('language')} style={{ width: '10%' }}></Column>
            <Column field="blackCardsCount" header={t('amountOfBlackCards')} style={{ width: '15%' }}></Column>
            <Column field="whiteCardsCount" header={t('amountOfWhiteCards')} style={{ width: '15%' }}></Column>
            <Column field="user.username" header={t('user')} style={{ width: '10%' }}></Column>
            <Column field="code" header={t('code')} style={{ width: '10%' }}></Column>
        </DataTable>
    );
};
