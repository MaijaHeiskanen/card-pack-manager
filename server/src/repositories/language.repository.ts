import { getRepository } from 'typeorm';
import { Language } from '../models';

export interface ILanguagePayload {
    code: string;
    name: string;
    native: string;
}

export const createLanguage = async (payload: ILanguagePayload): Promise<Language> => {
    const repository = getRepository(Language);
    const language = new Language();

    return repository.save({
        ...language,
        ...payload,
    });
};

export const getLanguages = async (): Promise<Language[]> => {
    const repository = getRepository(Language);
    const languages = repository.find();

    if (!languages) {
        throw new Error();
    }

    return languages;
};
