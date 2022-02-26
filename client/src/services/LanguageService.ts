import { Language } from '../types/generated-types-d';
import { Service } from './Service';

export class LanguageService extends Service<Language> {
    url = '/languages';
}
