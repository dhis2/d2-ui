import { Observable } from 'rxjs';
import { getInstance, config } from 'd2/lib/d2';
import getBaseUrlFromD2ApiUrl from './getBaseUrlFromD2ApiUrl';
import log from 'loglevel';

// Profile menu
config.i18n.strings.add('settings');
config.i18n.strings.add('profile');
config.i18n.strings.add('account');
config.i18n.strings.add('help');
config.i18n.strings.add('log_out');
config.i18n.strings.add('about_dhis2');

const profileMenuData = [
    {
        name: 'settings',
        namespace: '/dhis-web-user-profile',
        defaultAction: '/dhis-web-user-profile/#/settings',
        icon: '/icons/usersettings.png',
        description: '',
    },
    {
        name: 'profile',
        namespace: '/dhis-web-user-profile',
        defaultAction: '/dhis-web-user-profile/#/profile',
        icon: '/icons/function-profile.png',
        description: '',
    },
    {
        name: 'account',
        namespace: '/dhis-web-user-profile',
        defaultAction: '/dhis-web-user-profile/#/account',
        icon: '/icons/function-account.png',
        description: '',
    },
    {
        name: 'help',
        namespace: '/dhis-web-commons-about',
        defaultAction: 'https://dhis2.github.io/dhis2-docs/master/en/user/html/dhis2_user_manual_en.html',
        icon: '/icons/function-account.png',
        description: '',
    },
    {
        name: 'about_dhis2',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/about.action',
        icon: '/icons/function-about-dhis2.png',
        description: '',
    },
];

function addHelpLinkToProfileData() {
    return getInstance()
        .then(d2 => d2.system.settings.get('helpPageLink'))
        // When the request for the system setting fails we return false to not set the help link
        .catch(() => false)
        .then(helpPageLink => profileMenuData
            .map((profileMenuItem) => {
                // Override the defaultAction with the helpPageLink when one was found.
                if (helpPageLink && profileMenuItem.name === 'help') {
                    return Object.assign({}, profileMenuItem, { defaultAction: helpPageLink });
                }

                return profileMenuItem;
            })
        );
}

export const profileSource$ = Observable.fromPromise(addHelpLinkToProfileData(profileMenuData));

// TODO: Remove this when we have proper support for `displayName` from the getModules.action.
function getTranslationsForMenuItems({modules}) {
    return getInstance()
        .then(d2 => {
            const api = d2.Api.getApi();

            const moduleNames = modules.map(module => module.name);

            return api.post('i18n', moduleNames);
        })
        .then(translations => {
            const translatedModules = modules.map(module => Object.assign({...module}, { displayName: translations[module.name] || module.name }));

            return { modules: translatedModules };
        })
        .catch(() => {
            log.warn('Could not load translations for modules, defaulting back to English');

            return { modules };
        });
}

/**
 * Module management is available though the More Apps button. We therefore do not display it in the menu as a separate item.
 *
 * @param modules
 * @returns {{modules: [module]}}
 */
function removeMenuManagementModule({modules}) {
    return {
        modules: modules.filter(module => module.name !== 'dhis-web-menu-management'),
    };
}


function loadMenuItems() {
    return getInstance()
        .then(d2 => {
            const api = d2.Api.getApi();
            const baseUrl = getBaseUrlFromD2ApiUrl(d2);

            // This path is only correct when the manifest has '..' as the baseUrl and a versioned api endpoint is used
            // TODO: This should have a proper API endpoint
            return api.get(baseUrl + `/dhis-web-commons/menu/getModules.action?_=${(new Date).getTime()}`);
        })
        .then(getTranslationsForMenuItems)
        .then(removeMenuManagementModule)
        .then(({modules}) => modules);
}

export const appsMenuSource$ = Observable
    .fromPromise(loadMenuItems())
    .catch(Observable.of([]));
