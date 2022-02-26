import { AxiosResponse } from 'axios';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { LanguageDropdown } from '../components/LanguageDropdown';
import useService from '../hooks/useService';
import { LanguageService } from '../services/LanguageService';
import { Language } from '../types/generated-types-d';

type LanguageDropdownControllerProps = {
    value: undefined | Language;
    onChange: (language: Language) => void;
    required?: boolean;
};

export const LanguageDropdownController = (props: LanguageDropdownControllerProps) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const languageService = useService(new LanguageService());

    const languageChanged = (event: DropdownChangeParams) => {
        props.onChange(event.value);
    };

    const getLanguagesSuccessCallback = (response: AxiosResponse<Language[]>) => {
        setLanguages(response.data);
    };

    useEffect(() => {
        languageService.get([], getLanguagesSuccessCallback);
    }, [languageService]);

    return (
        <LanguageDropdown
            required={props.required}
            value={props.value}
            onChange={languageChanged}
            languages={languages}
        />
    );
};
