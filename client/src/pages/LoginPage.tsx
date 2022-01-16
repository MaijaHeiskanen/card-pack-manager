import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';

import { LoginContainer } from '../containers/LoginContainer';
import { RegisterContainer } from '../containers/RegisterContainer';

export const LoginPage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full pt-4 pb-6">
            <div className="pt- pb-8 flex flex-nowrap justify-content-center">
                <div className="w-4 ">
                    <LoginContainer />
                </div>
            </div>
            <div className="flex flex-nowrap justify-content-center">
                <div className="w-4 ">
                    <Divider align="center">
                        <span className="uppercase font-semibold text-600">{t('or')}</span>
                    </Divider>
                </div>
            </div>

            <div className="py-8 flex flex-nowrap justify-content-center">
                <div className="w-4">
                    <RegisterContainer />
                </div>
            </div>
        </div>
    );
};
