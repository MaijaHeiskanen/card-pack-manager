import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const navigateToCardpackSearch = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-column">
            <div className="flex w-full justify-content-center p-8 text-4xl">{t('pageNotFound')} :(</div>
            <div className="flex w-4 justify-content-center p-8 align-self-center">
                <Button label={t('returnToBrowseCardpacks')} onClick={navigateToCardpackSearch} />
            </div>
        </div>
    );
};
