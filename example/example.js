import React from 'react';
import Form from '../src/forms/Form.component';
import TextField from 'material-ui/lib/text-field';
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

import IndicatorExpressionManagerExample from './IndicatorExpressionManagerExample';
import SharingDialogExample from './SharingDialogExample';

const style = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue500,
        primary2Color: Colors.blue700,
        primary3Color: Colors.lightBlack,
        accent1Color: '#276696',
        accent2Color: '#E9E9E9',
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};

const fcs = [
    {
        name: 'username',
        type: TextField,
        fieldOptions: {
            floatingLabelText: 'username',
        },
    },
    {
        name: 'password',
        type: TextField,
        fieldOptions: {
            floatingLabelText: 'password',
        },
    },
];

const user = {
    username: 'Mark',
    password: 'SuperSecret',
};

const Main = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object,
        d2: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(style),
        };
    },

    render() {
        return (
            <div>
                <h3>Form</h3>
                <Form source={user} fieldConfigs={fcs} />
                <hr />
                <h3>Expression manager</h3>
                <IndicatorExpressionManagerExample />
                <hr />
                <h3>Sharing dialog</h3>
                <SharingDialogExample />
            </div>
        );
    },
});

React.render(
    <Main />,
    document.getElementById('app')
);
