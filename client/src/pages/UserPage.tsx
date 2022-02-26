import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export const UserPage = () => {
    const { userId } = useParams();
    const { user } = useUserContext();

    const p = useParams();

    console.log(p);

    if (user && user.id === userId) {
        return <div className="p-8">Oma profiilisi</div>;
    }

    return <div className="p-8">Käyttäjän {userId} profiili</div>;
};
