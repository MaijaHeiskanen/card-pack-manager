import classNames from 'classnames';

interface TitleProps {
    text: string;
    className?: string;
}

export const Title = (props: TitleProps) => {
    return <div className={classNames('text-900 text-3xl font-medium mb-3', props.className)}>{props.text}</div>;
};
