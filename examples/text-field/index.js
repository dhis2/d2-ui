import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from '../../src/text-field/TextField';

injectTapEventPlugin();

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const buttons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={style}>
            <TextField
                label='Text'
                onChange={() => {}}
            />
            <TextField
                label='Number'
                type='number'
                onChange={() => {}}
            />
            <TextField
                label='Default value'
                type='number'
                value={100}
                onChange={() => {}}
            />
        </div>
    </MuiThemeProvider>
);

render(buttons, document.getElementById('text-fields'));
