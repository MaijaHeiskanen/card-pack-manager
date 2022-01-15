import classNames from 'classnames';
import { StepIndicator, StepIndicatorTypes } from './StepIndicator';

interface StepProps {
    children: React.ReactChild | React.ReactChild;
    className?: string;
    state: StepIndicatorTypes;
}

export const StepWrapper = (props: StepProps) => {
    return (
        <div className={classNames('flex align-items-start my-5', props.className)}>
            <StepIndicator type={props.state} />
            {props.children}
        </div>
    );
};
