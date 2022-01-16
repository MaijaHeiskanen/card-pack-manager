export interface AppWrapperProps {
    children: React.ReactChild | React.ReactChild[];
}

export const AppWrapper = (props: AppWrapperProps) => {
    return <div className="m-4">{props.children}</div>;
};
