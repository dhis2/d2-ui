import isObject from 'lodash/fp/isObject';
import { getInstance } from 'd2/lib/d2';

export const apiFetch = async (urlOrPath, method, body = null) => {
    const d2 = await getInstance();
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
