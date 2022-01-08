import classNames from 'classnames';

type NavigationTreeProps = {};

export const NavigationTree = (props: NavigationTreeProps) => {
    return (
        <div className={'max-w-max m-2 p-2 text-900 border-1 border-round border-primary'}>
            <span>Selaa pakkoja</span>
            <span className={'ml-3'}>{'>'}</span>
            <span className={'ml-3'}>{'Pakan nimi'}</span>
        </div>
    );
};
