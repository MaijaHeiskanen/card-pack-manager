import { Get, Route, Tags } from 'tsoa';
import { Language } from '../models';
import { getLanguages } from '../repositories/language.repository';

@Route('languages')
@Tags('Language')
export default class LanguageController {
    @Get('/')
    public async getLanguages(): Promise<Language[]> {
        return getLanguages();
    }
}
