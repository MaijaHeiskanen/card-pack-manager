import classNames from 'classnames';
import { User } from '../types/generated-types-d';
import { CardsPieChart } from './CardsPieChart';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface CardpackInfoProps {
    name: string;
    user: User;
    languageCode: string;
    nsfw: boolean;
    description: string;
    code: string;
    blackCardsCount: number;
    whiteCardsCount: number;
    className?: string;
}

export const CardpackInfo = (props: CardpackInfoProps) => {
    const { t } = useTranslation();
    const { className, name, user, languageCode, nsfw, description, code, blackCardsCount, whiteCardsCount } = props;
    const [codeCopied, setCodeCopied] = useState(false);

    const copyCode = () => {
        setCodeCopied(true);
    };

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
                    <div className="mb-2">{t('copyCode')}:</div>
                    <Button
                        iconPos="right"
                        icon={classNames({
                            'pi pi-copy': !codeCopied,
                            'pi pi-check': codeCopied,
                        })}
                        label={code}
                        className={classNames('p-button-sm p-button-rounded', {
                            'p-button-success': codeCopied,
                        })}
                        onClick={copyCode}
                    />
                </div>
                <div className="flex-grow-2 hidden md:block">
                    <CardsPieChart blackCardsCount={blackCardsCount} whiteCardsCount={whiteCardsCount} />
                </div>
            </div>
        </div>
    );
};
