import i18n from '@dhis2/d2-i18n';
import isObject from 'lodash/isObject';

export const CHART = 'CHART';
export const MAP = 'MAP';
export const REPORT_TABLE = 'REPORT_TABLE';
export const EVENT_REPORT = 'EVENT_REPORT';
export const EVENT_CHART = 'EVENT_CHART';

export const extractFavorite = item => {
    if (!isObject(item)) {
        return null;
    }

    switch (item.type) {
        case REPORT_TABLE:
            return item.reportTable;
        case CHART:
            return item.chart;
        case MAP:
            return item.map;
        case EVENT_REPORT:
            return item.eventReport;
        case EVENT_CHART:
            return item.eventChart;
        default:
            return (
                item.reportTable ||
                item.chart ||
                item.map ||
                item.eventReport ||
                item.eventChart ||
                {}
            );
    }
};

export const getId = item => extractFavorite(item).id;

export const getBaseUrl = d2 => {
    const api = d2.Api.getApi();
    const idx = api.baseUrl.indexOf('/api');
    return idx > -1 ? api.baseUrl.slice(0, idx) : api.baseUrl;
};

export const getLink = (item, d2) => {
    const baseUrl = getBaseUrl(d2);
    const appUrl = itemTypeMap[item.type].appUrl(getId(item));

    return `${baseUrl}/${appUrl}`;
};

export const itemTypeMap = {
    [REPORT_TABLE]: {
        id: REPORT_TABLE,
        appUrl: id => `dhis-web-pivot/?id=${id}`,
        propName: 'reportTable',
        appName: i18n.t('Pivot Tables'),
    },
    [CHART]: {
        id: CHART,
        appUrl: id => `dhis-web-data-visualizer/#/${id}`,
        propName: 'chart',
        appName: i18n.t('Visualizer'),
    },
    [MAP]: {
        id: MAP,
        appUrl: id => `dhis-web-maps/?id=${id}`,
        propName: 'maps',
        appName: i18n.t('Maps'),
    },
    [EVENT_REPORT]: {
        id: EVENT_REPORT,
        appUrl: id => `dhis-web-event-reports/?id=${id}`,
        propName: 'eventReport',
        appName: i18n.t('Event Reports'),
    },
    [EVENT_CHART]: {
        id: EVENT_CHART,
        appUrl: id => `dhis-web-event-visualizer/?id=${id}`,
        propName:  'eventChart',
        appName: i18n.t('Event Visualizer'),
    },
};
