import { AxiosResponse } from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UsernameInput } from '../components/UsernameInput';
import useDebounce from '../hooks/useDebounce';
import useService from '../hooks/useService';
import { UserService } from '../services/UserService';
import mapErrorStatusToText from '../statusHelpers/mapErrorStatusToText';

interface UsernameInputContainerProps {
    onValidValue: (validValue: string) => void;
    onLoading?: () => void;
    onError?: (error: { status: string; valid: boolean }) => void;
    onEmpty?: () => void;
}

export const UsernameInputContainer = ({ onValidValue, onLoading, onEmpty, onError }: UsernameInputContainerProps) => {
    const { t } = useTranslation();
    const service = useService(new UserService());
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const debouncedUsername = useDebounce(username, 1000);

    const usernameValidated = useCallback(
        (response: AxiosResponse) => {
            if (response.data.valid) {
                onValidValue(debouncedUsername);
                setErrorMessage('');

                return;
            }

            setErrorMessage(mapErrorStatusToText(response.data.status));
            if (onError) onError(response.data);
        },
        [debouncedUsername, onValidValue, onError]
    );

    const usernameValidationError = useCallback(
        (error: any) => {
            if (onError) onError(error);
            setErrorMessage(t('somethingWentWrongTryAgain'));
        },
        [onError, t]
    );

    useEffect(() => {
        if (debouncedUsername.length === 0) {
            if (onEmpty) onEmpty();

            setErrorMessage('');

            return;
        }

        service.validateUsername({ username: debouncedUsername }, usernameValidated, usernameValidationError);
    }, [debouncedUsername, onValidValue, onEmpty, onError, t, usernameValidated, usernameValidationError, service]);

    const usernameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setUsername(newValue);

        if (onLoading) onLoading();
    };

    return <UsernameInput value={username} onChange={usernameChanged} errorMessage={errorMessage} />;
};
