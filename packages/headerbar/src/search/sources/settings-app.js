import map from 'lodash/fp/map';
import { Observable } from 'rxjs/Observable';
import { config, getInstance as getD2 } from 'd2/lib/d2';
import getBaseUrlFromD2ApiUrl from '../../utils/getBaseUrlFromD2ApiUrl';
import { prepareMenuItems, translate$, translateMenuItemNames } from '../../headerBar.store';


// These files are copied from the settings app
// https://github.com/dhis2/settings-app/blob/master/src/settingsCategories.js
import { categories as settingsCategories } from './settings-app/settingsCategories';


function addTranslationLabel(label) {
    config.i18n.strings.add(label);
}

// Register labels of settings categories for translation
map(addTranslationLabel,
    Object.keys(settingsCategories).map(categoryName => settingsCategories[categoryName].pageLabel));

const getMenuItemForCategory = categoryKey => ({
    name: settingsCategories[categoryKey].pageLabel,
    defaultAction: `/dhis-web-settings/#/${categoryKey}`,
    icon: '/icons/dhis-web-settings.png',
    description: '',
    parentApp: 'dhis-web-settings',
});

const settingsCategoryItemMap = Object.keys(settingsCategories).map(getMenuItemForCategory);

export default function addDeepLinksForSettings(headerBarMenuItems) {
    const settingsItems$ = Observable.of(settingsCategoryItemMap);

    return Observable
        .combineLatest(translate$, settingsItems$, translateMenuItemNames)
        .flatMap(items => Observable.fromPromise(getD2().then(d2 =>
            prepareMenuItems(getBaseUrlFromD2ApiUrl(d2), items),
        )))
        .map(settingsMenuItems => [].concat(headerBarMenuItems, settingsMenuItems));
}
