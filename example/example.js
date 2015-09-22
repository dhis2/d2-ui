import React from 'react';
import Form from '../src/forms/Form.component';
import TextField from 'material-ui/lib/text-field';

import IndicatorExpressionManagerExample from './IndicatorExpressionManagerExample';

const ThemeManager = new (require('material-ui/lib/styles/theme-manager'))();
const Colors = require('material-ui/lib/styles/colors');

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
            muiTheme: ThemeManager.getCurrentTheme(),
        };
    },

    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500,
        });
    },

    render() {
        return (
            <div>
                <h3>Form</h3>
                <Form source={user} fieldConfigs={fcs} />
                <hr />
                <h3>Expression manager</h3>
                <IndicatorExpressionManagerExample />
            </div>
        );
    },
});

React.render(
    <Main />,
    document.getElementById('app')
);
