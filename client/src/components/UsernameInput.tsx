import { ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface UsernameInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    errorMessage?: string;
}

export const UsernameInput = (props: UsernameInputProps) => {
    const { t } = useTranslation();
    const { onChange, value } = props;

    return (
        <>
            <div className="p-float-label p-field mt-5 mb-1">
                <InputText
                    id="username"
                    value={value}
                    onChange={onChange}
                    className={classNames('p-block', { 'p-invalid': props.errorMessage })}
                />
                <label htmlFor="username">{t('username')}</label>
            </div>
            {props.errorMessage && (
                <small id="username-error" className="p-error p-d-block">
                    {props.errorMessage}
                </small>
            )}
        </>
    );
};
