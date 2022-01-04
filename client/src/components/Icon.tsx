import classNames from 'classnames';

type IconProps = {
    name: string;
    className?: string;
    spin?: boolean;
};

export const Icon = (props: IconProps) => {
    const { name, spin, className } = props;

    return <i className={classNames(name, className, { 'pi-spin': spin })}></i>;
};
