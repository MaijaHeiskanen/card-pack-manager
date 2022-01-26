import classNames from 'classnames';
import { ReactChild, ReactChildren } from 'react';

interface ListWrapperProps {
    children: ReactChildren | ReactChild;
    className?: string;
}

export const ListWrapper = (props: ListWrapperProps) => {
    return (
        <div
            className={classNames('mx-0 md:mx-4 lg:mx-8 border-solid border-1 border-300', props.className)}
            style={{ borderRadius: '2px' }}
        >
            {props.children}
        </div>
    );
};
