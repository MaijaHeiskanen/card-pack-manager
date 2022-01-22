import { DataTableSelectionChangeParams } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { CardpackList } from '../components/CardpackList';
import { Cardpack } from '../types/generated-types-d';

interface CardpackListContainerProps {
    cardpacks: Cardpack[] | undefined;
}

export const CardpackListContainer = (props: CardpackListContainerProps) => {
    const navigate = useNavigate();

    const navigateToCardpackPage = (e: DataTableSelectionChangeParams) => {
        navigate(`/cardpacks/${e.value.id}`);
    };

    return (
        <div className="mx-0 md:mx-4 lg:mx-8 border-solid border-1 border-300" style={{ borderRadius: '2px' }}>
            <CardpackList cardpacks={props.cardpacks} onClickRow={navigateToCardpackPage} />
        </div>
    );
};
