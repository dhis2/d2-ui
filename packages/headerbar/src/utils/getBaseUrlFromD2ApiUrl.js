function replaceTrailingSlash(value) {
    return value.replace(/\/{1,}$/, '');
}

function getUrl(location) {
    const { protocol, host, pathname } = location;
    const correctedPath = /^\//.test(pathname) ? pathname : `/${pathname}`;

    return replaceTrailingSlash(`${protocol}//${host}${correctedPath}`);
}

export default function getBaseUrlFromD2ApiUrl(d2) {
    // Create <a> element to use to create correct relative paths
    const url = document.createElement('a');

    // If we have a d2.Api object available use that as the source for the server location
    if (d2.Api) {
        url.href = d2.Api.getApi().baseUrl.replace(/\/api(?:\/2[3-9])?\/?$/i, '');

        // IE11 does not set the host property for relative urls so we set it to the window.location hostname
        if (!url.host) {
            url.host = window.location.host;
        }

        // We only need to get the url from the apiUrl if the request is a
        return getUrl(url);
    }

    // Since no d2 baseUrl can be used we'll fall back to use the document's location
    console && console.info('Can not find d2 baseUrl, falling back to one folder up in the current location');
    url.href = `${document.location.pathname}/../`;

    return getUrl(url);
}
