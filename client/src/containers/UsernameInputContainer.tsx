import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { UsernameInput } from '../components/UsernameInput';
import useDebounce from '../hooks/useDebounce';

interface UsernameInputContainerProps {
    onValidValue: (validValue: string) => void;
    onLoading?: () => void;
    onError?: (error: { message: string; type: string }) => void;
    onEmpty?: () => void;
}

export const UsernameInputContainer = (props: UsernameInputContainerProps) => {
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
            .post('/users/validate/username', {
                debouncedUsername,
            })
            .then((response) => {
                props.onValidValue(debouncedUsername);
                setErrorMessage('');
                console.log({ response });
            })
            .catch((error) => {
                if (props.onError) props.onError(error);
                setErrorMessage(error.message);
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
