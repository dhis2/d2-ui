function getUrl(location) {
    const {protocol, host, pathname} = location;

    return `${protocol}//${host}${pathname}`;
}

export default function getBaseUrlFromD2ApiUrl(d2) {
    // Create <a> element to use to create correct relative paths
    const url = document.createElement('a');

    // If we have a d2.Api object available use that as the source for the server location
    if (d2.Api) {
        url.href = d2.Api.getApi().baseUrl.replace(/\/api(?:\/2[3-9])?\/?$/i, '');

        // We only need to get the url from the apiUrl if the request is a
        return getUrl(url);
    }

    // Since no d2 baseUrl can be used we'll fall back to use the document's location
    console && console.info('Can not find d2 baseUrl, falling back to one folder up in the current location');
    url.href = `${document.location.pathname}/../`;

    return getUrl(url);
}
