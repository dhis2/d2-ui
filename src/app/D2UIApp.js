import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function D2UIApp(props) {
    return (
        <MuiThemeProvider muiTheme={props.theme || getMuiTheme()}>
            {props.children}
        </MuiThemeProvider>
    );
}
