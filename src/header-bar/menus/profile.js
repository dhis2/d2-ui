export default function getProfileMenu(options = {}) {
    return {
        name: 'profile',
        label: options.userFullname || 'profile',
        dataSource: [
            {
                name: 'settings',
                namespace: '/dhis-web-commons-about',
                defaultAction: '../dhis-web-commons-about/userSettings.action',
                icon: '../icons/usersettings.png',
                description: '',
            },
            {
                name: 'profile',
                namespace: '/dhis-web-commons-about',
                defaultAction: '../dhis-web-commons-about/showUpdateUserProfileForm.action',
                icon: '../icons/function-profile.png',
                description: '',
            },
            {
                name: 'account',
                namespace: '/dhis-web-commons-about',
                defaultAction: '../dhis-web-commons-about/showUpdateUserAccountForm.action',
                icon: '../icons/function-account.png',
                description: '',
            },
            {
                name: 'help',
                namespace: '/dhis-web-commons-about',
                defaultAction: options.helpPageLink,
                icon: '../icons/function-account.png',
                description: '',
            },
            {
                name: 'log_out',
                namespace: '/dhis-web-commons-about',
                defaultAction: '../dhis-web-commons-security/logout.action',
                icon: '../icons/function-log-out.png',
                description: '',
            },
            {
                name: 'about_dhis2',
                namespace: '/dhis-web-commons-about',
                defaultAction: '../dhis-web-commons-about/about.action',
                icon: '../icons/function-about-dhis2.png',
                description: '',
            },
        ],
        options: {
            icon: 'user',
            shortCut: 'comma',
        },
    };
}
