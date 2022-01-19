export enum LOCAL_STORAGE_FIELD {
    ACCESS_TOKEN = 'accessToken',
}

export function setAccessToken(accessToken: string | null) {
    if (!accessToken) {
        localStorage.removeItem(LOCAL_STORAGE_FIELD.ACCESS_TOKEN);

        return;
    }

    localStorage.setItem(LOCAL_STORAGE_FIELD.ACCESS_TOKEN, accessToken);
}

export function getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_FIELD.ACCESS_TOKEN);
}

export function removeAccessToken() {
    localStorage.removeItem(LOCAL_STORAGE_FIELD.ACCESS_TOKEN);
}
