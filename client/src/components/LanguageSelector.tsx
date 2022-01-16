import { useTranslation } from 'react-i18next';
import { availableLanguages } from './../i18n';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';

export const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    const onLanguageChange = (data: DropdownChangeParams) => {
        console.log({ data });

        i18n.changeLanguage(data.value.name);
    };

    return (
        <div className="p-inputtext-sm">
            <Dropdown
                value={{
                    name: i18n.language,
                    code: i18n.language,
                }}
                options={availableLanguages.map((language) => ({
                    name: language,
                    code: language,
                }))}
                onChange={onLanguageChange}
                optionLabel="name"
                placeholder="Select a City"
            />
        </div>
    );
};
