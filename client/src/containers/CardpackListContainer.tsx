import { DataTableSelectionChangeParams } from 'primereact/datatable';
import { useNavigate, useParams } from 'react-router-dom';
import { CardpackList } from '../components/CardpackList';
import { Cardpack } from '../types/generated-types-d';
import { ListWrapper } from '../wrappers/ListWrapper';
import { CreateCardpackContainer } from './CreateCardpackContainer';

interface CardpackListContainerProps {
    cardpacks: Cardpack[] | undefined;
}

export const CardpackListContainer = (props: CardpackListContainerProps) => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const navigateToCardpackPage = (e: DataTableSelectionChangeParams) => {
        let url = '';

        if (userId) {
            url += `/users/${userId}`;
        }

        url += `/cardpacks/${e.value.rowData.id}`;

        navigate(url);
    };

    const getCardpacks = (allCardpacks: Cardpack[] | undefined) => {
        if (!userId || !allCardpacks) {
            return allCardpacks;
        }

        const filteredCardpacks = [];

        for (let i = 0, len = allCardpacks.length; i < len; i++) {
            const pack = allCardpacks[i];

            if (pack.userId === userId) {
                filteredCardpacks.push(pack);
            }
        }

        return filteredCardpacks;
    };

    return (
        <div className="flex flex-column align-items-center">
            <CreateCardpackContainer />
            <ListWrapper>
                <CardpackList cardpacks={getCardpacks(props.cardpacks)} onClickRow={navigateToCardpackPage} />
            </ListWrapper>
        </div>
    );
};
