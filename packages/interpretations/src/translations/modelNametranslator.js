import i18n from '@dhis2/d2-i18n';

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