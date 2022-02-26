import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';
import { Language } from '../types/generated-types-d';

type LanguageDropdownProps = {
    value: undefined | Language;
    onChange: (event: DropdownChangeParams) => void;
    languages: Language[];
    required?: boolean;
};

export const LanguageDropdown = (props: LanguageDropdownProps) => {
    const { t } = useTranslation();

    const getOptions = () => {
        return props.languages;
    };

    return (
        <div className="p-float-label p-field mt-5 mb-1">
            <Dropdown
                value={props.value}
                options={getOptions()}
                onChange={props.onChange}
                optionLabel="native"
                filter
                filterBy="native"
                filterPlaceholder={t('search')}
            />
            <label htmlFor={'language'}>{t('language')}</label>
            <label htmlFor={'language'}>{`${t('language')}${props.required ? ' *' : ''}`}</label>
        </div>
    );
};
