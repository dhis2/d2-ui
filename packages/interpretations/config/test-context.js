import { createMuiTheme } from '@material-ui/core/styles';

// Color palette from https://projects.invisionapp.com/share/A7LT4TJYETS#/screens/302550228_Color
const colors = {
    accentPrimary: '#1976d2',
    accentPrimaryDark: '#004BA0',
    accentPrimaryLight: '#63A4FF',
    accentPrimaryLightest: '#EAF4FF',

    accentSecondary: '#00796B',
    accentSecondaryDark: '#004C40',
    accentSecondaryLight: '#48A999',
    accentSecondaryLightest: '#B2DFDB',

    black: '#000000',
    greyBlack: '#494949',
    grey: '#9E9E9E',
    greyLight: '#E0E0E0',
    blueGrey: '#ECEFF1',
    snow: '#F4F6F8',
    white: '#FFFFFF', // Not included in palette!

    negative: '#E53935',
    warning: '#F19C02',
    positive: '#3D9305',
    info: '#EAF4FF',
};

const palette = {
    common: {
        white: colors.white,
        black: colors.black,
    },
    action: {
        active: colors.greyBlack,
        disabled: colors.greyLight,
    },
    text: {
        primary: colors.black,
        secondary: colors.greyBlack,
        disabled: colors.grey,
        hint: colors.grey,
    },
    primary: {
        main: colors.accentPrimary,
        dark: colors.accentPrimaryDark,
        light: colors.accentPrimaryLight,
        lightest: colors.accentPrimaryLightest, // Custom extension, not used by default
        // contrastText: 'white',
    },
    secondary: {
        main: colors.accentSecondary,
        dark: colors.accentSecondaryDark,
        light: colors.accentSecondaryLight,
        lightest: colors.accentSecondaryLightest, // Custom extension, not used by default
        // contrastText: 'white',
    },
    error: {
        main: colors.negative, // This is automatically expanded to main/light/dark/contrastText, what do we use here?
    },
    status: {
        //Custom colors collection, not used by default in MUI
        negative: colors.negative,
        warning: colors.warning,
        positive: colors.positive,
        info: colors.info,
    },
    background: {
        paper: colors.white,
        default: colors.snow,
        grey: '#FCFCFC',
        hover: colors.greyLight,
    },
    divider: colors.greyLight,
    shadow: colors.grey,
};

const muiTheme = createMuiTheme({
    colors,
    palette,
    typography: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        useNextVariants: true,
    },
    overrides: {
        MuiDivider: {
            light: {
                backgroundColor: palette.divider, // No light dividers for now
            },
        },
    },
});

export function getMuiTheme() {
    return muiTheme;
}

/* istanbul ignore next */
export function getStubContext() {
    return {
        d2: {
            i18n: {
                getTranslation(key) {
                    return `${key}_translated`;
                },
                addStrings: jest.fn().mockReturnValue(true),
                strings: {
                    add: () => {},
                },
            },
            Api: {
                getApi: jest.fn().mockReturnValue({baseUrl: 'http://localhost:8080'}),
            },
            system: {
                settings: {
                    all: jest.fn().mockReturnValue(Promise.resolve({})),
                },
                systemInfo: {
                    contextPath: "http://test-dhis-server.org",
                },
            },
            currentUser: {
                firstName: 'Mark',
                surname: 'Polak',
                userSettings: {
                    keyStyle: 'vietnam/vietnam.css',
                    settings: {
                        keyUiLocale: "en",
                    },
                },
                authorities: new Set(),
            },
        },
    };
}
