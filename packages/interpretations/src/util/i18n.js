import moment from 'moment';

export function formatDate(dateString) {
    const isoformat = dateString.split(".")[0];
    const localizedFormat = moment.localeData().longDateFormat('L');
    return moment(dateString, moment.ISO_8601).format(localizedFormat);
}

export function formatRelative(dateString) {
    const isoformat = dateString.split(".")[0];
    return moment(dateString, moment.ISO_8601).fromNow();
}
