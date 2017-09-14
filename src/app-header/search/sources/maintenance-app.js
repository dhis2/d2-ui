import { map } from 'lodash/fp';
import { curry } from 'lodash/fp';
import { compose } from 'lodash/fp';
import { Observable } from 'rxjs';
import { flatten } from 'lodash/fp';
import { filter } from 'lodash/fp';
import { mapValues } from 'lodash/fp';
import { prepareMenuItems, translate$, translateMenuItemNames, getBaseUrlFromD2 } from '../../headerBar.store';
import { config, getInstance } from 'd2/lib/d2';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';

// This file is copied from the maintenance app
// https://github.com/dhis2/maintenance-app/blob/master/src/config/maintenance-models.js
import { getSideBarConfig } from './maintenance-app/maintenance-models';

const maintenanceSections = getSideBarConfig();

function addToTranslationConfig(modelName) {
    config.i18n.strings.add(modelName);
}

map(addToTranslationConfig, map(camelCaseToUnderscores, flatten(map('items', maintenanceSections))));

const getMenuItemsFromModelName = curry((section, modelName) => ({
    name: camelCaseToUnderscores(modelName),
    defaultAction: `/dhis-web-maintenance/#/list/${section}/${modelName}`,
    icon: '/icons/dhis-web-maintenance.png',
    description: '',
    parentApp: 'dhis-web-maintenance',
}));

const toKeyValueArray = obj => Object
    .keys(obj)
    .map(key => [key, obj[key]]);

const filterOutEmptyValueLists = ([key, value]) => value.length;
const getMapOfModelsPerSection = mapValues('items', maintenanceSections);
const sectionsWithModels = filter(filterOutEmptyValueLists, toKeyValueArray(getMapOfModelsPerSection));
const getMenuItemConfigsForSection = ([section, models]) => map(getMenuItemsFromModelName(section), models);
const createAppsListForMenu = compose(flatten, map(getMenuItemConfigsForSection));

// Replace this with a proper source for there values
export default function addDeepLinksForMaintenance(apps) {
    const maintenanceDeepLinks$ = Observable.of(createAppsListForMenu(sectionsWithModels));

    return Observable
        .combineLatest(translate$, maintenanceDeepLinks$, translateMenuItemNames)
        .flatMap(items => Observable.fromPromise(getInstance().then(d2 => prepareMenuItems(getBaseUrlFromD2(d2), items))))
        .map(maintenanceItems => [].concat(apps, maintenanceItems));
}
