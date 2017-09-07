import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Button from '../../src/button/Button.component';

injectTapEventPlugin();

const style = {
    margin: 8
};

const buttons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button raised>Raised</Button>
            <Button raised color='primary'>Primary</Button>
            <Button raised color='accent'>Accent</Button>
            <Button raised disabled>Disabled</Button>
        </div>
    </MuiThemeProvider>
);

render(buttons, document.getElementById('buttons'));
