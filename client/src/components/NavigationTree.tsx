import { PrimeIcons } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem, MenuItemCommandParams } from 'primereact/menuitem';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cardpack } from '../types/generated-types-d';

type NavigationTreeProps = {
    cardpacks: Cardpack[] | undefined;
};

const getCardpackNameById = (id: string, cardpacks: Cardpack[]) => {
    for (let i = 0, len = cardpacks.length; i < len; i++) {
        if (cardpacks[i].id === id) {
            return cardpacks[i].name;
        }
    }

    return null;
};

export const NavigationTree = (props: NavigationTreeProps) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navigateTo = (e: MenuItemCommandParams) => {
        navigate(e.item.to);
    };

    const buildNavigationItems = (path: string, cardpacks: Cardpack[] = []): MenuItem[] => {
        const browseItem = {
            label: t('browse'),
            command: navigateTo,
            to: '/',
        };

        if (path.length === 0) {
            return [];
        }

        if (path === '/') {
            return [browseItem];
        }

        const parts = path.split('/');

        if (parts[0] === '') {
            parts.splice(0, 1);
        }

        if (parts[0] === 'login') {
            return [
                {
                    label: t('login'),
                    command: navigateTo,
                    to: '/login',
                },
            ];
        }

        if (parts[0] === 'cardpack') {
            const cardpackId = parts[1];
            const cardpackName = getCardpackNameById(cardpackId, cardpacks);

            if (!cardpackName) {
                return [browseItem];
            }

            return [
                browseItem,
                {
                    label: cardpackName,
                    command: navigateTo,
                    to: `/cardpack/${cardpackId}`,
                },
            ];
        }

        return [];
    };

    const items = buildNavigationItems(pathname, props.cardpacks);
    const home = { icon: PrimeIcons.HOME, command: navigateTo, to: '/' };

    return <BreadCrumb model={items} home={home} className="border-noround hidden sm:block" />;
};
