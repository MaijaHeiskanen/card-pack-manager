import axios from 'axios';
import { Button } from 'primereact/button';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoText } from '../components/InfoText';
import { StepIndicatorTypes } from '../components/StepIndicator';
import { StepWrapper } from '../components/StepWrapper';
import { Title } from '../components/Title';
import { UsernameInput } from '../components/UsernameInput';
import useDebounce from '../hooks/useDebounce';
import { GoogleLoginContainer } from './GoogleLoginContainer';

export const RegisterContainer = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [googleData, setGoogleData] = useState<any>();
    const [usernameState, setUsernameState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const [googleLoginState, setGoogleLoginState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const [createAccountState, setCreateAccountState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const debouncedUsername = useDebounce<string>(username, 1000);

    useEffect(() => {
        if (debouncedUsername.length === 0) {
            setUsernameState(StepIndicatorTypes.NEUTRAL);

            return;
        }

        axios
            .post('/users/validate/username', {
                debouncedUsername,
            })
            .then((response) => {
                setUsernameState(StepIndicatorTypes.SUCCESS);
                console.log({ response });
            })
            .catch((error) => {
                setUsernameState(StepIndicatorTypes.ERROR);
                console.log({ error });
            });
    }, [debouncedUsername]);

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

    const usernameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setUsername(newValue);
        setUsernameState(StepIndicatorTypes.LOADING);
    };

    return (
        <div>
            <Title text={t('register')} />
            <StepWrapper state={usernameState}>
                <div>
                    <InfoText text={t('usernameInfo')} />
                    <UsernameInput value={username} onChange={usernameChanged} />
                </div>
            </StepWrapper>
            <StepWrapper state={googleLoginState}>
                <div>
                    <InfoText text={t('googleLoginInfo')} />
                    <GoogleLoginContainer
                        successCallback={handleRegister}
                        errorCallback={handleRegister}
                        text={t('loginWithGoogle')}
                        className="block mt-2"
                    />
                </div>
            </StepWrapper>
            <StepWrapper state={createAccountState}>
                <div className="flex flex-column align-items-start">
                    <InfoText text={t('registerInfo')} />
                    <Button
                        label={t('createAccount')}
                        onClick={createAccount}
                        disabled={
                            usernameState !== StepIndicatorTypes.SUCCESS ||
                            googleLoginState !== StepIndicatorTypes.SUCCESS
                        }
                    />
                </div>
            </StepWrapper>
        </div>
    );
};
