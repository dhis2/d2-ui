import React from 'react';
import Form from '../src/forms/Form.component';
import TextField from 'material-ui/lib/text-field';

let ThemeManager = new (require('material-ui/lib/styles/theme-manager'))();
let Colors = require('material-ui/lib/styles/colors');

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

let Main = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object,
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
        return (<Form source={user} fieldConfigs={fcs} />);
    },
});

React.render(
    <Main />,
    document.getElementById('app')
);
