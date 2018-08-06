import moment from 'moment';
import i18n from '@dhis2/d2-i18n';

export function formatDate(dateString) {
    const isoformat = dateString.split(".")[0];
    const localizedFormat = moment.localeData().longDateFormat('L');
    return moment(dateString, moment.ISO_8601).format(localizedFormat);
}

export function formatRelative(dateString) {
    const isoformat = dateString.split(".")[0];
    return moment(dateString, moment.ISO_8601).fromNow();
}

export function translateModelName(modelName) {
    switch (modelName) {
    case 'chart':
        return i18n.t('chart');
    case 'reportTable':
        return i18n.t('pivot table');
    case 'map':
        return i18n.t('map');
    case 'eventChart':
        return i18n.t('event chart');
    case 'eventReport':
        return i18n.t('event report');
    default:
        return i18n.t('object');
    }
 }