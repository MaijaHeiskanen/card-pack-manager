import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UsernameInput } from '../components/UsernameInput';
import useDebounce from '../hooks/useDebounce';
import mapErrorStatusToText from '../statusHelpers/mapErrorStatusToText';

interface UsernameInputContainerProps {
    onValidValue: (validValue: string) => void;
    onLoading?: () => void;
    onError?: (error: { status: string; valid: boolean }) => void;
    onEmpty?: () => void;
}

export const UsernameInputContainer = ({ onValidValue, onLoading, onEmpty, onError }: UsernameInputContainerProps) => {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const debouncedUsername = useDebounce(username, 1000);

    useEffect(() => {
        if (debouncedUsername.length === 0) {
            if (onEmpty) onEmpty();

            setErrorMessage('');

            return;
        }

        axios
            .post('/users/register/validate/username', {
                username: debouncedUsername,
            })
            .then((response: AxiosResponse<{ valid: boolean; status: string }>) => {
                console.log({ response });

                if (response.data.valid) {
                    onValidValue(debouncedUsername);
                    setErrorMessage('');

                    return;
                }

                setErrorMessage(mapErrorStatusToText(response.data.status));
                if (onError) onError(response.data);
            })
            .catch((error) => {
                if (onError) onError(error);
                setErrorMessage(t('somethingWentWrongTryAgain'));
                console.log({ error });
            });
    }, [debouncedUsername, onValidValue, onEmpty, onError, t]);

    const usernameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setUsername(newValue);

        if (onLoading) onLoading();
    };

    return <UsernameInput value={username} onChange={usernameChanged} errorMessage={errorMessage} />;
};
