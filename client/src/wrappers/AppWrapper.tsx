export interface AppWrapperProps {
    children: React.ReactChild | React.ReactChild[];
}

export const AppWrapper = (props: AppWrapperProps) => {
    return <div className="flex flex-column flex-grow-1 pt-4 pb-8">{props.children}</div>;
};
