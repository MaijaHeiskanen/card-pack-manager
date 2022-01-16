import classNames from 'classnames';

export enum StepIndicatorTypes {
    SUCCESS = 'success',
    NEUTRAL = 'neutral',
    LOADING = 'loading',
    ERROR = 'error',
}

interface StepIndicatorProps {
    type: StepIndicatorTypes;
    className?: string;
}

export const StepIndicator = (props: StepIndicatorProps) => {
    const type = props.type;
    const baseStyles = classNames(
        'flex align-items-center justify-content-center p-1 mr-3 border-round',
        props.className
    );

    switch (type) {
        case StepIndicatorTypes.SUCCESS:
            return (
                <div className={classNames(baseStyles, 'bg-green-200 text-green-600')}>
                    <i className="pi pi-check-circle" style={{ fontSize: '2em' }}></i>
                </div>
            );
        case StepIndicatorTypes.NEUTRAL:
            return (
                <div className={classNames(baseStyles, 'surface-100 text-300')}>
                    <i className="pi pi-circle" style={{ fontSize: '2em' }}></i>
                </div>
            );
        case StepIndicatorTypes.LOADING:
            return (
                <div className={classNames(baseStyles, 'bg-yellow-200 text-yellow-600')}>
                    <i className="pi pi-spinner pi-spin" style={{ fontSize: '2em' }}></i>
                </div>
            );
        case StepIndicatorTypes.ERROR:
            return (
                <div className={classNames(baseStyles, 'bg-orange-200 text-orange-600')}>
                    <i className="pi pi-times-circle" style={{ fontSize: '2em' }}></i>
                </div>
            );
        default:
            return (
                <div className={classNames(baseStyles, 'surface-300 text-500')}>
                    <i className="pi pi-circle" style={{ fontSize: '2em' }}></i>
                </div>
            );
    }
};
