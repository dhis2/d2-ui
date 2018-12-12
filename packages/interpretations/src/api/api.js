import isObject from 'lodash/fp/isObject';

export const apiFetch = async (d2, urlOrPath, method, body = null) => {
    const api = d2.Api.getApi();
    const payload = isObject(body) && method !== "GET" ? JSON.stringify(body) : body;
    const options = {
        headers: {
            "Content-Type": isObject(body) ? 'application/json' : 'text/plain',
        },
    };
    const url = urlOrPath.startsWith("/") ? (api.baseUrl + urlOrPath) : urlOrPath;

    return api.request(method, url, payload, options);
};

export const apiFetchWithResponse = async (d2, urlOrPath, method, body = null) => {
    const api = d2.Api.getApi();
    const url = urlOrPath.startsWith("/") ? (api.baseUrl + urlOrPath) : urlOrPath;
    const options = {
        method,
        body,
        mode: 'cors',
        credentials: 'include',
        cache: 'default',
    };

    return fetch(url, options);
};
