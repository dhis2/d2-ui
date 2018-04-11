import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { CircularProgress } from 'd2-ui';

export default function Chips() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <CircularProgress />
                <CircularProgress large />
                <CircularProgress small />
                <CircularProgress large small />
            </div>
        </MuiThemeProvider>
    );
}
