import { useTranslation } from 'react-i18next';
import { availableLanguages } from './../i18n';

export const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    return (
        <select
            defaultValue={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
            {availableLanguages.map((language) => (
                <option key={language}>{language}</option>
            ))}
        </select>
    );
};
