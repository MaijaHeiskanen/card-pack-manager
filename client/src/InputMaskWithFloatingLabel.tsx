import { InputMask, InputMaskChangeParams } from 'primereact/inputmask';
import classNames from 'classnames';

type InputMaskWithFloatLabelProps = {
    value?: string;
    onChange: (params: InputMaskChangeParams) => void;
    label: string;
    errorMessage?: string;
    mask: string;
    required?: boolean;
};

export const InputMaskWithFloatLabel = (props: InputMaskWithFloatLabelProps) => {
    const { onChange, value, label, errorMessage, mask, required } = props;

    return (
        <>
            <div className="p-float-label p-field mt-5 mb-1">
                <InputMask
                    mask={mask}
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
