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

export const getLink = (item, d2, interpretationId) => {
    const baseUrl = getBaseUrl(d2);
    const appUrl = itemTypeMap[item.type].appUrl(getId(item), interpretationId);

    return `${baseUrl}/${appUrl}`;
};

export const itemTypeMap = {
    [REPORT_TABLE]: {
        id: REPORT_TABLE,
        appUrl: (modelId, interpretationId) => `dhis-web-pivot/index.html?id=${modelId}&interpretationid=${interpretationId}`,
        propName: 'reportTable',
        appName: i18n.t('Pivot Tables'),
        detailsTitle: i18n.t('Table details'),
    },
    [CHART]: {
        id: CHART,
        appUrl: (modelId, interpretationId) => `dhis-web-data-visualizer/#/${modelId}interpretation/${interpretationId}`,
        propName: 'chart',
        appName: i18n.t('Visualizer'),
        detailsTitle: i18n.t('Chart details'),
    },
    [MAP]: {
        id: MAP,
        appUrl: (modelId, interpretationId) => `dhis-web-maps/?id=${modelId}&interpretationid=${interpretationId}`,
        propName: 'maps',
        appName: i18n.t('Maps'),
        detailsTitle: i18n.t('Map details'),
    },
    [EVENT_REPORT]: {
        id: EVENT_REPORT,
        appUrl: (modelId, interpretationId) => `dhis-web-event-reports/index.html?id=${modelId}&interpretationid=${interpretationId}`,
        propName: 'eventReport',
        appName: i18n.t('Event Reports'),
        detailsTitle: i18n.t('Table details'),
    },
    [EVENT_CHART]: {
        id: EVENT_CHART,
        appUrl: (modelId, interpretationId) => `dhis-web-event-visualizer/index.html?id=${modelId}&interpretationid=${interpretationId}`,
        propName:  'eventChart',
        appName: i18n.t('Event Visualizer'),
        detailsTitle: i18n.t('Chart details'),
    },
};
