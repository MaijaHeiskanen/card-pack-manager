import classNames from 'classnames';

interface InfoTextProps {
    text: string;
    className?: string;
}

export const InfoText = (props: InfoTextProps) => {
    return <span className={classNames('text-600 font-medium line-height-3 mb-4', props.className)}>{props.text}</span>;
};
