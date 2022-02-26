import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';

type CheckboxWithFloatLabelProps = {
    value: boolean;
    onChange: (event: CheckboxChangeParams) => void;
    label: string;
};

export const CheckboxWithFloatLabel = (props: CheckboxWithFloatLabelProps) => {
    const { onChange, value, label } = props;

    return (
        <>
            <div className="field-checkbox mt-5 mb-1">
                <Checkbox inputId={label} checked={value} onChange={onChange} />
                <label htmlFor={label}>{label}</label>
            </div>
        </>
    );
};
