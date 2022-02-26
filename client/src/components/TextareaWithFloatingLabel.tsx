import { ChangeEvent } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';

type TextareaWithFloatLabelProps = {
    value?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    label: string;
    errorMessage?: string;
    required?: boolean;
};

export const TextareaWithFloatLabel = (props: TextareaWithFloatLabelProps) => {
    const { onChange, value, label, errorMessage, required } = props;

    return (
        <>
            <div className="p-float-label p-field mt-5 mb-1">
                <InputTextarea
                    autoResize
                    id={label}
                    value={value}
                    onChange={onChange}
                    className={classNames('p-block h-8rem', { 'p-invalid': errorMessage })}
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
