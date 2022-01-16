import i18next from 'i18next';

export default function mapErrorStatusToText(status: string | undefined) {
    if (status === undefined) {
        return i18next.t('error.somethingWentWrong');
    }

    switch (status) {
        case 'usernameAlreadyTaken':
            return i18next.t('error.usernameAlreadyTaken');
        case 'emailAlreadyTaken':
            return i18next.t('error.emailAlreadyTaken');
        case 'googleTokenIdWasInvalid':
            return i18next.t('error.googleTokenIdWasInvalid');
        default:
            return i18next.t('error.somethingWentWrong');
    }
}
