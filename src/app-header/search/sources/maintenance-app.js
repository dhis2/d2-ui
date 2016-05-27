import mapLd from 'lodash/fp/map';
import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';
import { Observable } from 'rx';
import flatten from 'lodash/fp/flatten';
import filter from 'lodash/fp/filter';
import mapValues from 'lodash/fp/mapValues';
import { prepareMenuItems, translate$, translateMenuItemNames } from '../../headerBar.store';
import { config } from 'd2/lib/d2';

const map = curry(mapLd);

const maintenanceSections = {
    all: {
        items: [],
    },
    dataElementSection: {
        items: [
            'categoryOption',
            'category',
            'categoryCombo',
            'categoryOptionCombo',
            'categoryOptionGroup',
            'categoryOptionGroupSet',
            'dataElement',
            'dataElementGroup',
            'dataElementGroupSet',
        ],
    },
    dataSetSection: {
        items: [
            'dataSet',
        ],
    },
    indicatorSection: {
        items: [
            'indicator',
            'indicatorType',
            'indicatorGroup',
            'indicatorGroupSet',
        ],
    },

    organisationUnitSection: {
        items: [
            'organisationUnit',
            'organisationUnitGroup',
            'organisationUnitGroupSet',
            'organisationUnitLevel',
        ],
    },

    validationSection: {
        items: [
            'validationRule',
            'validationRuleGroup',
        ],
    },

    otherSection: {
        items: [
            'constant',
            'attribute',
            'optionSet',
        ],
    },
};

function addToTranslationConfig(modelName) {
    config.i18n.strings.add(modelName);
}

map(addToTranslationConfig, flatten(map('items', maintenanceSections)));

const getMenuItemsFromModelName = curry((section, modelName) => {
    return {
        name: modelName,
        defaultAction: `/dhis-web-maintenance/#/list/${section}/${modelName}`,
        icon: '/icons/dhis-web-maintenance.png',
        description: '',
    };
});

const toKeyValueArray = (obj) => Object
    .keys(obj)
    .map(key => [key, obj[key]]);

const filterOutEmptyValueLists = ([key, value]) => value.length;
const getMapOfModelsPerSection = mapValues('items', maintenanceSections);
const sectionsWithModels = filter(filterOutEmptyValueLists, toKeyValueArray(getMapOfModelsPerSection));
const getMenuItemConfigsForSection = ([section, models]) => map(getMenuItemsFromModelName(section), models);
const createAppsListForMenu = compose(flatten, map(getMenuItemConfigsForSection));

// Replace this with a proper source for there values
export default function addDeepLinksForMaintenance(apps) {
    const maintenanceDeepLinks$ = Observable.just(createAppsListForMenu(sectionsWithModels));

    return Observable
        .combineLatest(translate$, maintenanceDeepLinks$, translateMenuItemNames)
        .map(prepareMenuItems)
        .map(maintenanceItems => [].concat(apps, maintenanceItems));
}
