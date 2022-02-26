import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import { CardpackPage } from './CardpackPage';
import { CardpackListContainer } from '../containers/CardpackListContainer';

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
