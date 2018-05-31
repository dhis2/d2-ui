import Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
    blue100,
    blue700,
    grey100,
    grey400,
    orange500,
    orangeA200,
    darkBlack,
    white,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const theme = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#004ba0',
        primary2Color: blue700,
        primary3Color: blue100,
        accent1Color: orange500,
        accent2Color: grey100,
        accent3Color: orangeA200,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey400,
        disabledColor: fade(darkBlack, 0.3),
    },
};

const muiTheme = getMuiTheme(theme);

export default muiTheme;
