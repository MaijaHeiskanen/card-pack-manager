import classNames from 'classnames';
import { User } from '../types/generated-types-d';
import { CardsPieChart } from './CardsPieChart';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';

interface CardpackInfoProps {
    name: string;
    user: User;
    languageCode: string;
    nsfw: boolean;
    description: string;
    blackCardsCount: number;
    whiteCardsCount: number;
    className?: string;
}

export const CardpackInfo = (props: CardpackInfoProps) => {
    const { className, name, user, languageCode, nsfw, description, blackCardsCount, whiteCardsCount } = props;
    return (
        <div className={classNames(className)}>
            <div className="flex flex-nowrap">
                <div className="flex-grow-1 pr-4">
                    <div className="text-4xl font-medium mb-4">{name}</div>
                    <div className="text-lg mb-3">{description}</div>
                    <div className="mb-4">
                        <Chip label={languageCode} icon="pi pi-flag" className="mr-2 mb-2" />
                        <Chip label={user.username} icon="pi pi-user" className="mr-2 mb-2" />
                        {nsfw && <Chip label={'NSFW'} className="mr-2 mb-2" />}
                    </div>
                    <Button icon="pi pi-copy" label="Code thing" />
                </div>
                <div className="flex-grow-2 hidden md:block">
                    <CardsPieChart blackCardsCount={blackCardsCount} whiteCardsCount={whiteCardsCount} />
                </div>
            </div>
        </div>
    );
};
