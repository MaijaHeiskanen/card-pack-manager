import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export const UserPage = () => {
    const { userId } = useParams();
    const { user } = useUserContext();

    if (user && user.id === userId) {
        return <div className="p-8">Oma profiilisi</div>;
    }

    return <div className="p-8">Käyttäjän {userId} profiili</div>;
};
