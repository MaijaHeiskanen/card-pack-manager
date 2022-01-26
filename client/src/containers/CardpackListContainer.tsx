import { DataTableSelectionChangeParams } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { CardpackList } from '../components/CardpackList';
import { Cardpack } from '../types/generated-types-d';
import { ListWrapper } from '../wrappers/ListWrapper';

interface CardpackListContainerProps {
    cardpacks: Cardpack[] | undefined;
}

export const CardpackListContainer = (props: CardpackListContainerProps) => {
    const navigate = useNavigate();

    const navigateToCardpackPage = (e: DataTableSelectionChangeParams) => {
        navigate(`/cardpacks/${e.value.id}`);
    };

    return (
        <ListWrapper>
            <CardpackList cardpacks={props.cardpacks} onClickRow={navigateToCardpackPage} />
        </ListWrapper>
    );
};
