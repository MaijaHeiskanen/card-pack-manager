import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { GoogleLoginContainer } from '../containers/GoogleLoginContainer';

export const LoginPage = (props: object) => {
    const { t } = useTranslation();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const handleLogin = async (googleData: any) => {
        console.log({ googleData });
        // const res = await fetch('/api/v1/auth/google', {
        //     method: 'POST',
        //     body: JSON.stringify({ token: googleData.tokenId }),
        //     headers: { 'Content-Type': 'application/json' },
        // });
        // const data = await res.json(); // store returned user somehow
    };

    if (!clientId) {
        return <div>'Client ID missing'</div>;
    }

    return (
        <div>
            <div>{t('loginInfo')}</div>
            <GoogleLoginContainer />
        </div>
    );
    return <div>Login page</div>;
};
