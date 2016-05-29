import { Observable } from 'rx';
import { getInstance, config } from 'd2/lib/d2';

// Profile menu
config.i18n.strings.add('settings');
config.i18n.strings.add('profile');
config.i18n.strings.add('account');
config.i18n.strings.add('help');
config.i18n.strings.add('log_out');
config.i18n.strings.add('about_dhis2');

export const profileSource$ = Observable.just([
    {
        name: 'settings',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/userSettings.action',
        icon: '/icons/usersettings.png',
        description: '',
    },
    {
        name: 'profile',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/showUpdateUserProfileForm.action',
        icon: '/icons/function-profile.png',
        description: '',
    },
    {
        name: 'account',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/showUpdateUserAccountForm.action',
        icon: '/icons/function-account.png',
        description: '',
    },
    {
        name: 'help',
        namespace: '/dhis-web-commons-about',
        defaultAction: '', //helpPageLink.defaultAction || '', //FIXME: This sets the help url to an empty string when the ajax call failed. We should find an alternative.
        icon: '/icons/function-account.png',
        description: '',
    },
    {
        name: 'log_out',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-security/logout.action',
        icon: '/icons/function-log-out.png',
        description: '',
    },
    {
        name: 'about_dhis2',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/about.action',
        icon: '/icons/function-about-dhis2.png',
        description: '',
    },
]);

function loadMenuItems() {
    return getInstance()
        .then(d2 => {
            const api = d2.Api.getApi();

            return api.get(d2.Api.getApi().baseUrl.replace('/api', '') + '/dhis-web-commons/menu/getModules.action');
        })
        .then(({modules}) => modules);
}

export const appsMenuSource$ = Observable
    .fromPromise(loadMenuItems())
    .catch(Observable.just([]));
