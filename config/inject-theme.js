import stubContext from 'react-stub-context';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

/* istanbul ignore next */
export const appTheme = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.cyan500,
        primary2Color: Colors.cyan700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};

/* istanbul ignore next */
export function getStubContext() {
    const injectedTheme = appTheme || ThemeManager.getMuiTheme(appTheme);
    return {
        muiTheme: injectedTheme,
        d2: {
            i18n: {
                getTranslation(key) {
                    return `${key}_translated`;
                },
            },
            Api: {
                getApi: stub().returns({baseUrl: 'http://localhost:8080'}),
            },
            system: {
                settings: {
                    all: stub().returns(Promise.resolve({})),
                },
            },
        },
    };
}

/* istanbul ignore next */
function injectTheme(Component, theme) {
    const injectedTheme = theme || ThemeManager.getMuiTheme(appTheme);
    return stubContext(Component, {
        muiTheme: injectedTheme,
        d2: {
            i18n: {
                getTranslation(key) {
                    return `${key}_translated`;
                },
            },
            Api: {
                getApi: stub().returns({baseUrl: 'http://localhost:8080'}),
            },
            system: {
                settings: {
                    all: stub().returns(Promise.resolve({})),
                },
            },
        },
    });
}


export default injectTheme;
