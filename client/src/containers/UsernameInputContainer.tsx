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

export const UsernameInputContainer = (props: UsernameInputContainerProps) => {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const debouncedUsername = useDebounce<string>(username, 1000);

    useEffect(() => {
        if (debouncedUsername.length === 0) {
            if (props.onEmpty) props.onEmpty();

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
                    props.onValidValue(debouncedUsername);
                    setErrorMessage('');

                    return;
                }

                setErrorMessage(mapErrorStatusToText(response.data.status));
                if (props.onError) props.onError(response.data);
            })
            .catch((error) => {
                if (props.onError) props.onError(error);
                setErrorMessage(t('somethingWentWrongTryAgain'));
                console.log({ error });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedUsername]);

    const usernameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setUsername(newValue);

        if (props.onLoading) props.onLoading();
    };

    return <UsernameInput value={username} onChange={usernameChanged} errorMessage={errorMessage} />;
};
