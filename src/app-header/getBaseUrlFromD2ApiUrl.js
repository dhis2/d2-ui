export default function getBaseUrlFromD2ApiUrl(d2) {
    if (d2.Api) {
        return d2.Api.getApi().baseUrl.replace(/\/api(?:\/2[3-9])?\/?$/i, '');
    }
    return './'; // TODO: Get old base url from local storage
}
