import { Divider } from 'primereact/divider';

import { LoginContainer } from '../containers/LoginContainer';
import { RegisterContainer } from '../containers/RegisterContainer';

export const LoginPage = (props: object) => {
    return (
        <div className="w-full py-8">
            <div className="py-8 flex flex-nowrap justify-content-center">
                <div className="w-4 ">
                    <LoginContainer />
                </div>
            </div>
            <div className="flex flex-nowrap justify-content-center">
                <div className="w-4 ">
                    <Divider />
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
