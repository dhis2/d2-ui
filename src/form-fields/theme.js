
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

const theme = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue500,
        primary2Color: Colors.blue700,
        primary3Color: Colors.blue100,
        accent1Color: Colors.orange500,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey400,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};

const muiTheme = ThemeManager.getMuiTheme(theme);

export default Object.assign({}, muiTheme, {
    forms: {
        minWidth: 350,
        maxWidth: 750,
    },
    formInput: {
        fontWeight: 100,
    },
});
