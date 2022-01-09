import axios from 'axios';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useTranslation } from 'react-i18next';

export const GoogleLoginContainer = () => {
    const { t } = useTranslation();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // GoogleLoginResponse | GoogleLoginResponseOffline
    const handleLogin = async (googleData: any) => {
        console.log({ googleData });

        // axios.get(`/decks`).then((response) => {
        //     console.log('/decks/', response.data);
        // });
        axios
            .post('/users', {
                tokenId: googleData.tokenId,
            })
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log({ error });
            });

        // const res = await fetch('/users/verify', {
        //     method: 'POST',
        //     body: JSON.stringify({ tokenId: googleData.tokenId }),
        //     headers: { 'Content-Type': 'application/json' },
        // });
        // const data = await res.json(); // store returned user somehow

        // console.log(res);
    };

    if (!clientId) {
        return <div>'Client ID missing'</div>;
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText={'Login with Google'}
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};
