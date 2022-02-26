import { ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';

type TextInputWithFloatLabelProps = {
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    errorMessage?: string;
    required?: boolean;
};

export const TextInputWithFloatLabel = (props: TextInputWithFloatLabelProps) => {
    const { onChange, value, label, errorMessage, required } = props;

    return (
        <>
            <div className="p-float-label p-field mt-5 mb-1">
                <InputText
                    id={label}
                    value={value}
                    onChange={onChange}
                    className={classNames('p-block', { 'p-invalid': errorMessage })}
                />
                <label htmlFor={label}>{`${label}${required ? ' *' : ''}`}</label>
            </div>
            {errorMessage && (
                <small id={`${label}-error`} className="p-error p-d-block">
                    {errorMessage}
                </small>
            )}
        </>
    );
};
