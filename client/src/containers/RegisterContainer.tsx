import axios from 'axios';
import { Button } from 'primereact/button';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoText } from '../components/InfoText';
import { StepIndicatorTypes } from '../components/StepIndicator';
import { StepWrapper } from '../components/StepWrapper';
import { Title } from '../components/Title';
import { GoogleLoginContainer } from './GoogleLoginContainer';
import { UsernameInputContainer } from './UsernameInputContainer';

export const RegisterContainer = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [googleData, setGoogleData] = useState<any>();
    const [usernameState, setUsernameState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const [googleLoginState, setGoogleLoginState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const [createAccountState, setCreateAccountState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);

    const handleRegister = (data: any) => {
        console.log({ googleData: data });

        if (data.tokenId) {
            setGoogleLoginState(StepIndicatorTypes.SUCCESS);
        } else {
            setGoogleLoginState(StepIndicatorTypes.ERROR);
        }

        setGoogleData(data);
    };

    const createAccount = () => {
        setCreateAccountState(StepIndicatorTypes.LOADING);

        axios
            .post('/users/register', {
                tokenId: googleData.tokenId,
                username,
            })
            .then((response) => {
                setCreateAccountState(StepIndicatorTypes.SUCCESS);
                console.log({ response });
            })
            .catch((error) => {
                setCreateAccountState(StepIndicatorTypes.ERROR);
                console.log({ error });
            });
    };

    const usernameChangedValid = useCallback((validUsername: string) => {
        setUsername(validUsername);
        setUsernameState(StepIndicatorTypes.SUCCESS);
    }, []);

    const usernameEmptied = useCallback(() => {
        setUsername('');
        setUsernameState(StepIndicatorTypes.NEUTRAL);
    }, []);

    const usernameError = useCallback((error: { message: string; type: string }) => {
        setUsername('');
        setUsernameState(StepIndicatorTypes.ERROR);
    }, []);

    const usernameLoading = useCallback(() => {
        setUsernameState(StepIndicatorTypes.LOADING);
    }, []);

    const createAccountButtonDisabled =
        usernameState !== StepIndicatorTypes.SUCCESS || googleLoginState !== StepIndicatorTypes.SUCCESS;

    return (
        <div>
            <Title text={t('register')} />
            <StepWrapper state={usernameState} showDivider stepNumber={1}>
                <div>
                    <InfoText text={t('usernameInfo')} />
                    <UsernameInputContainer
                        onValidValue={usernameChangedValid}
                        onEmpty={usernameEmptied}
                        onError={usernameError}
                        onLoading={usernameLoading}
                    />
                </div>
            </StepWrapper>
            <StepWrapper state={googleLoginState} showDivider stepNumber={2}>
                <div>
                    <InfoText text={t('googleLoginInfo')} />
                    <GoogleLoginContainer
                        successCallback={handleRegister}
                        errorCallback={handleRegister}
                        text={t('loginWithGoogle')}
                        className="block mb-2 mt-4"
                        errorMessage={
                            googleLoginState === StepIndicatorTypes.ERROR ? t('googleLoginFailed') : undefined
                        }
                    />
                </div>
            </StepWrapper>
            <StepWrapper state={createAccountState} stepNumber={3}>
                <div className="flex flex-column align-items-start">
                    <InfoText text={t('createAccountInfo')} />
                    <Button
                        label={t('createAccount')}
                        onClick={createAccount}
                        disabled={createAccountButtonDisabled}
                        tooltip={
                            createAccountButtonDisabled
                                ? t('youHaveToSetUsernameAndGoogleAccountBeforeYouCanContinue')
                                : undefined
                        }
                        tooltipOptions={{ showOnDisabled: true }}
                    />
                </div>
            </StepWrapper>
        </div>
    );
};
