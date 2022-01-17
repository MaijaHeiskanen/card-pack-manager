import { PrimeIcons } from 'primereact/api';
import { useTranslation } from 'react-i18next';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

// import { MenuItem } from 'primereact/menuitem';
// import { LanguageSelector } from './LanguageSelector';
// import { HeaderItem } from './HeaderItem';
// import { Icon } from './Icon';

export const Header = () => {
    const { t } = useTranslation();
    const menuItems: MenuItem[] = [
        {
            label: t('browse'),
            icon: PrimeIcons.SEARCH,
        },
        {
            label: t('language'),
            icon: PrimeIcons.FLAG,
            items: [{ label: 'Suomi' }, { label: 'English' }],
        },
        {
            label: t('login'),
            icon: PrimeIcons.USER,
        },
    ];

    const start = <div className="my-3 hidden sm:block">Placeholder name</div>;

    return <Menubar model={menuItems} className="header" start={start} />; // TODO: Change color to primary blue and fix sub items too

    // return (
    //     <header className="flex flex-wrap px-3 bg-primary justify-content-between">
    //         <div className="my-3 hidden sm:block">Placeholder name</div>
    //         <div className="my-3 flex-grow-1 sm:hidden"></div>
    //         <div className="flex justify-content-end my-3 flex-wrap">
    //             <MenuItem />
    //             <span className="mr-4">
    //                 <LanguageSelector />
    //             </span>
    //             <HeaderItem
    //                 icon={<Icon name={PrimeIcons.SEARCH} className={'mr-2'} />}
    //                 linkTo={'/'}
    //                 linkText={t('browse')}
    //             />
    //             <HeaderItem
    //                 className={'ml-4'}
    //                 icon={<Icon name={PrimeIcons.USER} className={'mr-2'} />}
    //                 linkTo={'/login'}
    //                 linkText={t('login')}
    //             />
    //         </div>
    //     </header>
    // );
};
