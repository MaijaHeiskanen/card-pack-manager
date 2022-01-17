import { PrimeIcons } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItemCommandParams } from 'primereact/menuitem';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type NavigationTreeProps = {};

export const NavigationTree = (props: NavigationTreeProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const navigateTo = (e: MenuItemCommandParams) => {
        navigate(e.item.to);
    };

    const items = [
        { label: 'Computer' },
        { label: 'Notebook' },
        { label: 'Accessories' },
        { label: 'Backpacks' },
        { label: 'Item' },
    ];

    const home = { icon: PrimeIcons.HOME, command: navigateTo, to: '/' };

    return <BreadCrumb model={items} home={home} className="border-noround hidden sm:block" />;
};
