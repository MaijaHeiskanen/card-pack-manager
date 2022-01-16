import classNames from 'classnames';
import { t } from 'i18next';
import { Divider } from 'primereact/divider';
import { StepIndicator, StepIndicatorTypes } from './StepIndicator';

interface StepProps {
    children: React.ReactChild | React.ReactChild;
    className?: string;
    state: StepIndicatorTypes;
    showDivider?: boolean;
    stepNumber?: number;
}

export const StepWrapper = (props: StepProps) => {
    return (
        <>
            <div className={classNames('flex align-items-start justify-content-start my-5', props.className)}>
                {props.stepNumber && (
                    <span className="mr-3 flex-shrink-0 font-semibold text-600 line-height-3">
                        {`${t('step_number', { number: props.stepNumber })}:`}
                    </span>
                )}
                {props.children}
                <span className="flex-grow-1"></span>
                <StepIndicator type={props.state} className="ml-2 justify-self-end" />
            </div>
            {props.showDivider && <Divider />}
        </>
    );
};
