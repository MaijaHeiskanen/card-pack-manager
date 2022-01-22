import { AxiosResponse } from 'axios';
import { Button } from 'primereact/button';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InfoText } from '../components/InfoText';
import { StepIndicatorTypes } from '../components/StepIndicator';
import { StepWrapper } from '../components/StepWrapper';
import { Title } from '../components/Title';
import { UserService } from '../services/UserService';
import mapErrorStatusToText from '../statusHelpers/mapErrorStatusToText';
import { User } from '../types/generated-types-d';
import { GoogleLoginContainer } from './GoogleLoginContainer';
import { UsernameInputContainer } from './UsernameInputContainer';
import useService from '../hooks/useService';
import { setAccessToken } from '../auth/localstoragehelpers';
import { useUserContext } from '../contexts/userContext';

export const RegisterContainer = (props: { showAccountCreatedToast: (user: User) => void }) => {
    const { t } = useTranslation();
    const service = useService(new UserService());
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    const [username, setUsername] = useState<string>('');
    const [googleData, setGoogleData] = useState<any>();
    const [usernameState, setUsernameState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const [googleLoginState, setGoogleLoginState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);
    const [googleLoginError, setGoogleLoginError] = useState<string>('');
    const [createAccountState, setCreateAccountState] = useState<StepIndicatorTypes>(StepIndicatorTypes.NEUTRAL);

    const tokenIdValidated = (response: AxiosResponse<{ valid: boolean; status: string }>) => {
        if (response.data.valid) {
            setGoogleLoginError('');
            setGoogleLoginState(StepIndicatorTypes.SUCCESS);

            return;
        }

        setGoogleLoginError(mapErrorStatusToText(response.data.status));
        setGoogleLoginState(StepIndicatorTypes.ERROR);
    };

    const tokenIdValidationError = (err: any) => {
        setGoogleLoginError(t('somethingWentWrongTryAgain'));
        setGoogleLoginState(StepIndicatorTypes.ERROR);
    };

    const handleGoogleLogin = (data: any) => {
        setGoogleData(data);

        if (data.tokenId) {
            setGoogleLoginState(StepIndicatorTypes.LOADING);

            service.validateTokenId({ tokenId: data.tokenId }, tokenIdValidated, tokenIdValidationError);
        } else {
            setGoogleLoginError(t('googleLoginFailed'));
            setGoogleLoginState(StepIndicatorTypes.ERROR);
        }
    };

    const accountCreated = (response: AxiosResponse) => {
        setCreateAccountState(StepIndicatorTypes.SUCCESS);
        props.showAccountCreatedToast(response.data.user);
        navigate(`/users/${response.data.user.id}/cardpacks`);
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
    };

    const accountCreationError = (error: any) => {
        setCreateAccountState(StepIndicatorTypes.ERROR);
    };

    const createAccount = () => {
        setCreateAccountState(StepIndicatorTypes.LOADING);

        service.register({ tokenId: googleData.tokenId, username }, accountCreated, accountCreationError);
    };

    const usernameChangedValid = useCallback((validUsername: string) => {
        setUsername(validUsername);
        setUsernameState(StepIndicatorTypes.SUCCESS);
    }, []);

    const usernameEmptied = useCallback(() => {
        setUsername('');
        setUsernameState(StepIndicatorTypes.NEUTRAL);
    }, []);

    const usernameError = useCallback((error: { valid: boolean; status: string }) => {
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
                        successCallback={handleGoogleLogin}
                        errorCallback={handleGoogleLogin}
                        text={t('loginWithGoogle')}
                        className="block mb-2 mt-4"
                        errorMessage={googleLoginError}
                        showEmail
                        email={googleData?.profileObj?.email}
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
