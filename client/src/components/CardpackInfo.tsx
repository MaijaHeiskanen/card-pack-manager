import classNames from 'classnames';
import { User } from '../types/generated-types-d';
import { CardsPieChart } from './CardsPieChart';

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
                <div className="flex-grow-1">
                    <div>{name}</div>
                    <div>{nsfw}</div>
                    <div>{languageCode}</div>
                    <div>{user.username}</div>
                    <div>{description}</div>
                    <div>Kopioi koodi jolla lisätään peliin (placeholder)</div>
                </div>
                <div className="flex-grow-2 hidden md:block">
                    <CardsPieChart blackCardsCount={blackCardsCount} whiteCardsCount={whiteCardsCount} />
                </div>
            </div>
        </div>
    );
};
