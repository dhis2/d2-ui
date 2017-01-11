import map from 'lodash/fp/map';
import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';
import { Observable } from 'rx';
import flatten from 'lodash/fp/flatten';
import filter from 'lodash/fp/filter';
import mapValues from 'lodash/fp/mapValues';
import memoize from 'lodash/fp/memoize';
import { prepareMenuItems, translate$, translateMenuItemNames, getBaseUrlFromD2 } from '../../headerBar.store';
import { config, getInstance } from 'd2/lib/d2';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';

// TODO: This is duplicate code from the maintenance-app
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

map(addToTranslationConfig, map(camelCaseToUnderscores, flatten(map('items', maintenanceSections))));

const getMenuItemsFromModelName = curry((section, modelName) => {
    return {
        name: camelCaseToUnderscores(modelName),
        defaultAction: `/dhis-web-maintenance/#/list/${section}/${modelName}`,
        icon: '/icons/dhis-web-maintenance.png',
        description: '',
        parentApp: 'dhis-web-maintenance',
        modelName,
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

const createFilterItemsBasedOnAuthorities = (d2, requireAddToView) => ({ modelName }) => (requireAddToView === false) || d2.currentUser.canCreate(d2.models[modelName])
const getRequireAddToView = memoize((d2) => d2.system.settings.get('keyRequireAddToView')
    .catch((error) => {
        if (error.message === 'The requested systemSetting has no value or does not exist.') {
            return false;
        }
        return Promise.reject(error);
    }));

// Replace this with a proper source for there values
export default function addDeepLinksForMaintenance(apps) {
    const maintenanceDeepLinks$ = Observable
        .just(createAppsListForMenu(sectionsWithModels))
        .flatMap(items => (
            getInstance()
                .then(d2 => Promise.all([d2, getRequireAddToView(d2)]))
                .then(([d2, requireAddToView]) => items.filter(createFilterItemsBasedOnAuthorities(d2, requireAddToView)))
        ));

    return Observable
        .combineLatest(translate$, maintenanceDeepLinks$, translateMenuItemNames)
        .flatMap((items) => (
            getInstance()
                .then(d2 => prepareMenuItems(getBaseUrlFromD2(d2), items))
        ))
        .map(maintenanceItems => [].concat(apps, maintenanceItems));
}
