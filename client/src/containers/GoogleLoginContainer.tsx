import GoogleLogin from 'react-google-login';
import { Button } from 'primereact/button';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface GoogleLoginContainerProps {
    successCallback: (googleData: any) => void;
    errorCallback: (googleData: any) => void;
    text: string;
    disable?: boolean;
    className?: string;
    errorMessage?: string;
    email?: string;
    showEmail?: boolean;
}

export const GoogleLoginContainer = (props: GoogleLoginContainerProps) => {
    const { t } = useTranslation();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!clientId) {
        return <div>Google login disabled, client ID missing. Contact site host.</div>;
    }

    return (
        <>
            {props.showEmail && (
                <div className="mt-4 text-800">
                    <span>{`${t('email')}: `}</span>
                    {props.email ? (
                        <span>{props.email}</span>
                    ) : (
                        <span className="font-italic text-500">{t('emailNotChosen')}</span>
                    )}
                </div>
            )}
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
            {props.errorMessage && (
                <small id="username-error" className="p-error p-d-block">
                    {props.errorMessage}
                </small>
            )}
        </>
    );
};
