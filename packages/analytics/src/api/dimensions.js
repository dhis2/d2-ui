import sortBy from 'lodash/sortBy';

import { onError } from './index';
import { DATA_SETS_CONSTANTS } from '../modules/dataSets';
import { CHART_AGGREGATE_AGGREGATABLE_TYPES } from '../modules/dataTypes';

// Request util functions
const selectFromResponse = (response, entity, selectorFn) =>
    typeof selectorFn === 'function' ? selectorFn(response) : response[entity];

// Request functions
const request = (d2, entity, paramString, { selectorFn } = {}) => {
    const url = `/${entity}?${paramString}&paging=false`;

    return d2.Api.getApi()
        .get(url)
        .then(response => selectFromResponse(response, entity, selectorFn))
        .catch(onError);
};

const requestWithPaging = (
    d2,
    entity,
    paramString,
    page,
    { selectorFn } = {}
) => {
    const paging = `&paging=true&page=${page}`;
    const url = `/${entity}?${paramString}${paging}`;

    return d2.Api.getApi()
        .get(url)
        .then(response => ({
            dimensionItems: selectFromResponse(response, entity, selectorFn),
            nextPage: response.pager.nextPage ? response.pager.page + 1 : null,
        }))
        .catch(onError);
};

// Fetch functions
export const apiFetchDimensions = (d2, nameProp) => {
    const fields = `fields=id,${nameProp}~rename(name),dimensionType`;
    const order = `order=${nameProp}:asc`;

    const params = `${fields}&${order}`;

    return request(d2, 'dimensions', params);
};

export const apiFetchRecommendedIds = (d2, dxIds, ouIds) => {
    let dimensions = 'dimension=';

    if (dxIds.length) {
        dimensions = dimensions.concat(`dx:${dxIds.join(';')}`);

        if (ouIds.length)
            dimensions = dimensions.concat(`&dimension=ou:${ouIds.join(';')}`);
    } else if (ouIds.length) {
        dimensions = dimensions.concat(`ou:${ouIds.join(';')}`);
    } else {
        return Promise.resolve([]);
    }

    const url = `/dimensions/recommendations?${dimensions}&fields=id`;
    return d2.Api.getApi()
        .get(url)
        .then(response => response.dimensions.map(item => item.id))
        .catch(onError);
};

export const apiFetchItemsByDimension = (d2, dimensionId) => {
    const fields = `fields=id,displayName~rename(name)`;
    const order = `order=displayName:asc`;

    const url = `dimensions/${dimensionId}/items?${fields}&${order}`;

    return d2.Api.getApi()
        .get(url)
        .then(response => response.items);
};

export const apiFetchGroups = (d2, dataType, nameProp) => {
    // indicatorGroups does not support shortName
    const name = dataType === 'indicators' ? 'displayName' : nameProp;
    const fields = `fields=id,${name}~rename(name)`;
    const order = `order=${name}:asc`;

    const params = `${fields}&${order}`;

    switch (dataType) {
        case 'indicators': {
            return request(d2, 'indicatorGroups', params);
        }
        case 'dataElements': {
            return request(d2, 'dataElementGroups', params);
        }
        case 'dataSets': {
            return Promise.resolve(DATA_SETS_CONSTANTS);
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return request(d2, 'programs', params);
        }
        default:
            return null;
    }
};

export const apiFetchAlternatives = args => {
    const { d2, dataType, groupDetail, ...queryParams } = args;

    switch (dataType) {
        case 'indicators': {
            return fetchIndicators({ d2, ...queryParams });
        }
        case 'dataElements': {
            if (groupDetail === 'detail') {
                return fetchDataElementOperands({ d2, ...queryParams });
            } else {
                return fetchDataElements({ d2, ...queryParams });
            }
        }
        case 'dataSets': {
            return fetchDataSets({ d2, ...queryParams });
        }
        case 'eventDataItems': {
            return queryParams.groupId
                ? getEventDataItems({ d2, ...queryParams })
                : null;
        }
        case 'programIndicators': {
            return queryParams.groupId
                ? fetchProgramIndicators({ d2, ...queryParams })
                : null;
        }
        default:
            return null;
    }
};

const fetchIndicators = ({ d2, nameProp, groupId, filterText, page }) => {
    const fields = `fields=id,${nameProp}~rename(name),dimensionItemType&order=${nameProp}:asc`;
    const order = `order=${nameProp}:asc`;
    let filter =
        groupId !== 'ALL' ? `&filter=indicatorGroups.id:eq:${groupId}` : '';

    if (filterText) {
        filter = filter.concat(`&filter=${nameProp}:ilike:${filterText}`);
    }

    const paramString = `${fields}&${order}${filter}`;

    return requestWithPaging(d2, 'indicators', paramString, page);
};

const fetchDataElements = ({ d2, groupId, page, filterText, nameProp }) => {
    const idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    const fields = `fields=${idField},${nameProp}~rename(name)`;
    const order = `order=${nameProp}:asc`;

    let filter = '&filter=domainType:eq:AGGREGATE';
    if (groupId !== 'ALL') {
        filter = filter.concat(`&filter=dataElementGroups.id:eq:${groupId}`);
    }

    if (filterText) {
        filter = filter.concat(`&filter=${nameProp}:ilike:${filterText}`);
    }

    const paramString = `${fields}&${order}${filter}`;

    return requestWithPaging(d2, 'dataElements', paramString, page);
};

const fetchDataElementOperands = ({
    d2,
    groupId,
    page,
    filterText,
    nameProp,
}) => {
    const idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    const fields = `fields=${idField},${nameProp}~rename(name)`;
    const order = `order=${nameProp}:asc`;

    let filter = '';
    if (groupId !== 'ALL') {
        filter = `&filter=dataElement.dataElementGroups.id:eq:${groupId}`;
    }

    if (filterText) {
        const textFilter = `&filter=${nameProp}:ilike:${filterText}`;
        filter = filter.length ? filter.concat(textFilter) : textFilter;
    }

    return requestWithPaging(
        d2,
        'dataElementOperands',
        `${fields}&${order}${filter}`,
        page
    );
};

const fetchDataSets = ({ d2, page, filterText, nameProp }) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;
    const order = `order=${nameProp}:asc`;
    const filter = filterText ? `&filter=${nameProp}:ilike:${filterText}` : '';

    const paramString = `${fields}&${order}${filter}`;

    return requestWithPaging(d2, 'dataSets', paramString, page);
};

const fetchProgramDataElements = ({
    d2,
    groupId,
    page,
    filterText,
    nameProp,
}) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name),valueType`;
    const order = `order=${nameProp}:asc`;
    const program = `program=${groupId}`;
    const filter = filterText ? `&filter=${nameProp}:ilike:${filterText}` : '';

    const paramString = `${fields}&${order}&${program}${filter}`;

    return requestWithPaging(d2, 'programDataElements', paramString, page);
};

const fetchTrackedEntityAttributes = ({
    d2,
    groupId,
    page,
    filterText,
    nameProp,
}) => {
    const fields = `fields=${nameProp}~rename(name),programTrackedEntityAttributes[trackedEntityAttribute[id,${nameProp}~rename(name),valueType]]`;
    const filter = filterText ? `&filter=${nameProp}:ilike:${filterText}` : '';

    const paramString = `${fields}${filter}`;

    return request(d2, `programs/${groupId}`, paramString, {
        selectorFn: r =>
            Array.isArray(r.programTrackedEntityAttributes)
                ? r.programTrackedEntityAttributes
                      .map(a => a.trackedEntityAttribute)
                      .map(a => ({
                          ...a,
                          id: `${groupId}.${a.id}`,
                          name: `${r.name} ${a.name}`,
                      }))
                : [],
    });
};

const getEventDataItems = async (d2, queryParams) => {
    const [dataElementsObj, attributes] = await Promise.all([
        fetchProgramDataElements(d2, queryParams),
        fetchTrackedEntityAttributes(d2, queryParams),
    ]);

    const filterInvalidTypes = item =>
        Boolean(CHART_AGGREGATE_AGGREGATABLE_TYPES.includes(item.valueType));

    return {
        ...dataElementsObj,
        dimensionItems: sortBy(
            [...dataElementsObj.dimensionItems, ...attributes].filter(
                filterInvalidTypes
            ),
            'name'
        ),
    };
};

const fetchProgramIndicators = ({
    d2,
    groupId,
    page,
    filterText,
    nameProp,
}) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;
    const order = `order=${nameProp}:asc`;
    const programFilter = `filter=program.id:eq:${groupId}`;
    const filter = filterText ? `&filter=${nameProp}:ilike:${filterText}` : '';

    const paramString = `${fields}&${order}&${programFilter}${filter}`;

    return requestWithPaging(d2, 'programIndicators', paramString, page);
};
