import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';

import { LoginContainer } from '../containers/LoginContainer';
import { RegisterContainer } from '../containers/RegisterContainer';
import { User } from '../types/generated-types-d';

export const LoginPage = (props: { showAccountCreatedToast: (user: User) => void }) => {
    const { t } = useTranslation();
    const widthStyles = 'w-full sm:w-7 md:w-6 lg:w-4';

    return (
        <div className="w-full pt-4 pb-8 px-4">
            <div className="pt-6 pb-8 flex flex-nowrap justify-content-center">
                <div className={widthStyles}>
                    <LoginContainer />
                </div>
            </div>
            <div className="flex flex-nowrap justify-content-center">
                <div className={widthStyles}>
                    <Divider align="center">
                        <span className="uppercase font-semibold text-600">{t('or')}</span>
                    </Divider>
                </div>
            </div>

            <div className="py-8 flex flex-nowrap justify-content-center">
                <div className={widthStyles}>
                    <RegisterContainer showAccountCreatedToast={props.showAccountCreatedToast} />
                </div>
            </div>
        </div>
    );
};
