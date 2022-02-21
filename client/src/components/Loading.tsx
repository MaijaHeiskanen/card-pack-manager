import { ProgressSpinner } from 'primereact/progressspinner';

export const Loading = () => {
    return (
        <div className="w-full h-full flex flex-column justify-content-center align-items-center">
            <ProgressSpinner className="flex-grow-1 m-0" />
        </div>
    );
};
