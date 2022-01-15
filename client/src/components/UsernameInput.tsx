import { ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

interface UsernameInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const UsernameInput = (props: UsernameInputProps) => {
    const { t } = useTranslation();
    const { onChange, value } = props;

    return (
        <div className="p-float-label mt-5 mb-3">
            <InputText id="username" value={value} onChange={onChange} />
            <label htmlFor="username">{t('username')}</label>
        </div>
    );
};
