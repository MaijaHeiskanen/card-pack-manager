import { PrimeIcons } from 'primereact/api';
import { useTranslation } from 'react-i18next';
import { Menubar } from 'primereact/menubar';
import { MenuItem, MenuItemCommandParams } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import { removeAccessToken } from '../auth/localstoragehelpers';

export const Header = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    const onLanguageChange = (e: MenuItemCommandParams) => {
        i18n.changeLanguage(e.item.value);
    };

    const logout = () => {
        removeAccessToken();
        setUser(null);
        navigate('/');
    };

    const navigateTo = (e: MenuItemCommandParams) => {
        navigate(e.item.to);
    };

    const menuItems: MenuItem[] = [
        {
            label: t('browse'),
            icon: PrimeIcons.SEARCH,
            command: navigateTo,
            to: '/',
        },
        {
            label: t('language'),
            icon: PrimeIcons.FLAG,
            items: [
                { label: 'Suomi', value: 'fi', command: onLanguageChange },
                { label: 'English', value: 'en', command: onLanguageChange },
            ],
        },
    ];

    if (user) {
        menuItems.push({
            label: user.username,
            icon: PrimeIcons.USER,
            items: [
                { label: t('profile'), value: 'fi', command: navigateTo, to: `/users/${user.id}` },
                { label: t('myCardpacks'), value: 'fi', command: navigateTo, to: `/users/${user.id}/cardpacks` },
                { label: t('logOut'), value: 'en', command: logout },
            ],
        });
    } else {
        menuItems.push({
            label: t('login'),
            icon: PrimeIcons.USER,
            command: navigateTo,
            to: '/login',
        });
    }

    const start = <div className="my-3 hidden sm:block">Placeholder name</div>;

    return <Menubar model={menuItems} className="header" start={start} />;
};
