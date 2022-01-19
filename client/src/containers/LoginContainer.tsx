import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InfoText } from '../components/InfoText';
import { Title } from '../components/Title';
import { GoogleLoginContainer } from '../containers/GoogleLoginContainer';

export const LoginContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // GoogleLoginResponse | GoogleLoginResponseOffline
    const handleLogin = async (googleData: any) => {
        console.log({ googleData });

        axios
            .post('/users/login', {
                tokenId: googleData.tokenId,
            })
            .then((response) => {
                navigate(`/cardpacks/user/${response.data.user.id}`);
                console.log({ response });
            })
            .catch((error) => {
                console.log({ error });
            });
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
