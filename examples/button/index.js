import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Button from '../../src/button/Button';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button raised>Raised</Button>
            <Button raised color='primary'>Primary</Button>
            <Button raised color='accent'>Accent</Button>
            <Button raised disabled>Disabled</Button>
            <Button fab><ContentAdd /></Button>
            <Button fab color='accent'><ContentAdd /></Button>
        </div>
    </MuiThemeProvider>
);

render(buttons, document.getElementById('buttons'));
