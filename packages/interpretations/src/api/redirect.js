import isObject from 'lodash/isObject';

export const CHART = 'CHART';
export const MAP = 'MAP';
export const REPORT_TABLE = 'REPORT_TABLE';
export const EVENT_REPORT = 'EVENT_REPORT';
export const EVENT_CHART = 'EVENT_CHART';
export const VISUALIZATION = 'VISUALIZATION';

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
        case VISUALIZATION:
            return item.visualization || item.chart || item.reportTable;
        default:
            return (
                item.visualization ||
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
        appUrl: (modelId, interpretationId) => `dhis-web-pivot/?id=${modelId}&interpretationid=${interpretationId}`,
        propName: 'reportTable',
    },
    [CHART]: {
        id: CHART,
        appUrl: (modelId, interpretationId) => `dhis-web-data-visualizer/#/${modelId}/interpretation/${interpretationId}`,
        propName: 'chart',
    },
    [MAP]: {
        id: MAP,
        appUrl: (modelId, interpretationId) => `dhis-web-maps/?id=${modelId}&interpretationid=${interpretationId}`,
        propName: 'maps',
    },
    [EVENT_REPORT]: {
        id: EVENT_REPORT,
        appUrl: (modelId, interpretationId) => `dhis-web-event-reports/?id=${modelId}&interpretationid=${interpretationId}`,
        propName: 'eventReport',
    },
    [EVENT_CHART]: {
        id: EVENT_CHART,
        appUrl: (modelId, interpretationId) => `dhis-web-event-visualizer/?id=${modelId}&interpretationid=${interpretationId}`,
        propName:  'eventChart',
    },
    [VISUALIZATION]: {
        id: VISUALIZATION,
        appUrl: (modelId, interpretationId) => `dhis-web-data-visualizer/#/${modelId}/interpretation/${interpretationId}`,
        propName: 'visualization',
    },
};
