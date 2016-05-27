import { getInstance } from 'd2/lib/d2';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import headerBarSettingsStore$ from './settings/settings.store';
import { profileSource$, appsMenuSource$ } from './menu-sources';
import curry from 'lodash/fp/curry';
import pickLodash from 'lodash/fp/pick';
import getLodash from 'lodash/fp/get';
import { Observable } from 'rx';

const pick = curry(pickLodash);
const pluck = curry(getLodash);

const translate = curry(function translate(d2, key) {
    return d2.i18n.getTranslation(key);
});

const d2$ = Observable.fromPromise(getInstance());
const currentUser$ = d2$.map(pluck('currentUser'));
export const translate$ = Observable
    .combineLatest(
        d2$,
        Observable.just(translate),
        (d2, translateFn) => translateFn(d2)
    );

export function translateMenuItemNames(translate, items) {
    return items.map((item) => Object.assign({}, item, { name: translate(item.name) }));
}

const removePrefix = (word) => word.replace(/^\.\./, '');
const isAbsoluteUrl = (url) => /^(?:https?:)?\/\//.test(url);

const addBaseUrlWhenNotAnAbsoluteUrl = curry((baseUrl, url) => isAbsoluteUrl(url) ? url : baseUrl + removePrefix(url));
const adjustIconUrl = curry((baseUrl, item) => Object.assign({}, item, { icon: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, item.icon) }));
const adjustDefaultActionUrl = curry((baseUrl, item) => Object.assign({}, item, { action: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, item.defaultAction) }));
const adjustMenuItemsUrls = compose(adjustIconUrl(DHIS_CONFIG.baseUrl), adjustDefaultActionUrl(DHIS_CONFIG.baseUrl));
const getLabelFromName = (item) => Object.assign({}, item, { label: item.displayName || item.name });
const extractMenuProps = pick(['action', 'icon', 'description', 'label']);
const prepareMenuItem = compose(extractMenuProps, adjustMenuItemsUrls, getLabelFromName);
export const prepareMenuItems = map(prepareMenuItem);

const profileMenuItems$ = Observable
    .combineLatest(translate$, profileSource$, translateMenuItemNames)
    .map(prepareMenuItems);

const appsMenuItems$ = appsMenuSource$
    .map(prepareMenuItems);

const headerBarStore$ = Observable
    .combineLatest(
        appsMenuItems$,
        profileMenuItems$,
        currentUser$,
        headerBarSettingsStore$,
        (appItems, profileItems, currentUser, settings) => ({appItems, profileItems, currentUser, settings})
    );

export default headerBarStore$;
