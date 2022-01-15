import GoogleLogin from 'react-google-login';
import { Button } from 'primereact/button';
import classNames from 'classnames';

interface GoogleLoginContainerProps {
    successCallback: (googleData: any) => void;
    errorCallback: (googleData: any) => void;
    text: string;
    disable?: boolean;
    className?: string;
}

export const GoogleLoginContainer = (props: GoogleLoginContainerProps) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!clientId) {
        return <div>Google login disabled, client ID missing. Contact site host.</div>;
    }

    return (
        <GoogleLogin
            clientId={clientId}
            render={(renderProps) => {
                return (
                    <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled || props.disable}
                        label={props.text}
                        icon="pi pi-google"
                        className={classNames(props.className)}
                    />
                );
            }}
            buttonText={props.text}
            onSuccess={props.successCallback}
            onFailure={props.errorCallback}
            cookiePolicy={'single_host_origin'}
        />
    );
};
