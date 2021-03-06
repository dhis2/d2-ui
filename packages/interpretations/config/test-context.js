import { createMuiTheme } from '@material-ui/core/styles';

export function getMuiTheme() {
    return createMuiTheme({
        typography: {
            useNextVariants: true,
        },
    });
}

export function getStubContext() {
    return {
        d2: {
            i18n: {
                getTranslation(key) {
                    return `${key}_translated`;
                },
            },
            Api: {
                getApi: jest
                    .fn()
                    .mockReturnValue({ baseUrl: 'http://localhost:8080' }),
            },
            system: {
                settings: {
                    all: jest.fn().mockReturnValue(Promise.resolve({})),
                },
                systemInfo: {
                    contextPath: 'http://test-dhis-server.org',
                },
            },
            currentUser: {
                firstName: 'Mark',
                surname: 'Polak',
                userSettings: {
                    keyStyle: 'vietnam/vietnam.css',
                    settings: {
                        keyUiLocale: 'en',
                    },
                },
                authorities: new Set(),
                userGroupAccesses: [
                    {
                        access: 'rw------',
                        userGroupUid: 'wl5cDMuUhmF',
                        displayName: 'Administrators',
                        id: 'wl5cDMuUhmF',
                    },
                ],
                userAccesses: [],
                getUserGroups: jest.fn().mockReturnValue(
                    Promise.resolve({
                        valuesContainerMap: [],
                        keys: () => jest.fn(),
                    })
                ),
                getUserGroupIds: jest.fn().mockReturnValue([]),
            },
        },
        locale: 'en',
        appName: 'CHART',
    };
}
