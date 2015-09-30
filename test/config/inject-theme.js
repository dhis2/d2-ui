import stubContext from 'react-stub-context';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

const Manager = new ThemeManager();


function injectTheme(Component, theme) {
    const injectedTheme = theme || Manager.getCurrentTheme();
    return stubContext(Component, {
        muiTheme: injectedTheme,
        d2: {
            i18n: {
                getTranslation(key) {
                    return `${key}_translated`;
                },
            },
        },
    });
}

export default injectTheme;
