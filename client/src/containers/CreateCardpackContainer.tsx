import { ChangeEvent, useState } from 'react';
import { CardpackService } from '../services/CardpackService';
import useService from '../hooks/useService';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AxiosResponse } from 'axios';
import { Cardpack, Language } from '../types/generated-types-d';
import { PrimeIcons } from 'primereact/api';
import { LanguageDropdownController } from './LanguageDropdownController';
import { InputTextarea } from 'primereact/inputtextarea';
import { TextInputWithFloatLabel } from '../components/TextInputWithFloatLabel';
import { InputMaskWithFloatLabel } from '../InputMaskWithFloatingLabel';
import { InputMaskChangeParams } from 'primereact/inputmask';
import { CheckboxWithFloatLabel } from '../components/CheckboxWithFloatingLabel';
import { CheckboxChangeParams } from 'primereact/checkbox';
import { TextareaWithFloatLabel } from '../components/TextareaWithFloatingLabel';

export const CreateCardpackContainer = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const cardpackService = useService(new CardpackService());
    const [showDialog, setShowDialog] = useState(false);
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [nsfw, setNsfw] = useState(false);
    const [language, setLanguage] = useState<Language>();
    const [code, setCode] = useState<string>();
    const [creating, setCreating] = useState(false);

    const reset = () => {
        setName(undefined);
        setDescription(undefined);
        setNsfw(false);
        setLanguage(undefined);
        setCode(undefined);
        setShowDialog(false);
        setCreating(false);
    };

    const onCancel = () => {
        reset();
    };

    const cardpackCreated = (response: AxiosResponse<Cardpack>) => {
        console.log('created', response.data);
        reset();
    };

    const cardpackCreationError = (err: any) => {
        console.log(err);
    };

    const onCreate = () => {
        if (!name || !description || !language || !user) return;

        const cardpack = {
            name,
            description,
            nsfw,
            languageCode: language.code,
            code,
            userId: user.id,
        };

        cardpackService.post(cardpack, cardpackCreated, cardpackCreationError);
    };

    const hasAllFields = () => {
        return name && description && language && user;
    };

    const languageChanged = (language: Language) => {
        setLanguage(language);
    };

    const nameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const codeChanged = (params: InputMaskChangeParams) => {
        setCode(params.target.value);
    };

    const nsfwChanged = (params: CheckboxChangeParams) => {
        setNsfw(params.target.checked);
    };

    const descriptionChanged = (params: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(params.target.value);
    };

    const footer = (
        <div>
            <Button label={t('cancel')} onClick={onCancel} className="p-button-outlined" />
            <Button
                label={t('create')}
                onClick={onCreate}
                disabled={!hasAllFields()}
                icon={creating ? PrimeIcons.SPINNER : PrimeIcons.PLUS}
            />
        </div>
    );

    return (
        <>
            <Button label="uusi" onClick={() => setShowDialog(true)} disabled={!user} />
            <Dialog
                draggable={false}
                breakpoints={{ '1200px': '70vw', '992px': '75vw', '768px': '85vw', '576px': '100vw' }}
                style={{ width: '60vw' }}
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                header={t('createNewCardpack')}
                footer={footer}
            >
                <div className="flex flex-column md:flex-row">
                    <div className="w-full">
                        <TextInputWithFloatLabel value={name} onChange={nameChanged} label={t('name')} required />
                        <InputMaskWithFloatLabel
                            value={code}
                            onChange={codeChanged}
                            label={t('code')}
                            mask={'********'}
                        />
                        <LanguageDropdownController required value={language} onChange={languageChanged} />
                    </div>
                    <div className="w-full">
                        <TextareaWithFloatLabel
                            value={description}
                            onChange={descriptionChanged}
                            label={t('description')}
                            required
                        />
                        <CheckboxWithFloatLabel value={nsfw} onChange={nsfwChanged} label={t('cardpackIsNsfw')} />
                    </div>
                </div>
            </Dialog>
        </>
    );
};
