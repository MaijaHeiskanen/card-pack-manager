import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../auth/accessTokenHelpers';
import { InfoText } from '../components/InfoText';
import { Title } from '../components/Title';
import { GoogleLoginContainer } from '../containers/GoogleLoginContainer';
import { UserService } from '../services/UserService';
import useService from '../hooks/useService';

export const LoginContainer = () => {
    const { t } = useTranslation();
    const service = useService(new UserService());
    const navigate = useNavigate();

    const loginSuccessCallback = (response: AxiosResponse) => {
        console.log({ response });

        navigate(`/cardpacks/user/${response.data.user.id}`);
        setAccessToken(response.data.accessToken);
    };

    const loginErrorCallback = (err: any) => {
        console.error('login error:', err);
    };

    // GoogleLoginResponse | GoogleLoginResponseOffline
    const handleLogin = async (googleData: any) => {
        service.login({ tokenId: googleData.tokenId }, loginSuccessCallback, loginErrorCallback);
    };

    return (
        <div className="">
            <Title text={t('login')} />
            <InfoText text={t('loginInfo')} />
            <GoogleLoginContainer
                successCallback={handleLogin}
                errorCallback={handleLogin}
                text={t('loginWithGoogle')}
                className="block mt-4"
            />
        </div>
    );
};
