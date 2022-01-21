export enum LOCAL_STORAGE_FIELD {
    ACCESS_TOKEN = 'accessToken',
    USER = 'user',
}

export function setInLocalStorage(field: LOCAL_STORAGE_FIELD, value: string | object | null) {
    if (typeof value === 'object') {
        const storableValue = JSON.stringify(value);

        localStorage.setItem(field, storableValue);

        return;
    }

    localStorage.setItem(field, value);
}

export function getFromLocalStorage(field: LOCAL_STORAGE_FIELD) {
    const value = localStorage.getItem(field);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}

export function removeFromLocalStorage(field: LOCAL_STORAGE_FIELD) {
    localStorage.removeItem(field);
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
