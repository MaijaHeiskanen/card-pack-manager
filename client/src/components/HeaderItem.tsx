import classNames from 'classnames';
import { Link } from 'react-router-dom';

type HeaderItemProps = {
    className?: string;
    icon?: JSX.Element;
    linkTo: string;
    linkText: string;
};

export const HeaderItem = (props: HeaderItemProps) => {
    const { className, icon, linkText, linkTo } = props;

    return (
        <span className={classNames(className)}>
            {icon}
            <Link to={linkTo}>{linkText}</Link>
        </span>
    );
};
