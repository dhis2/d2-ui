import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chip from '../../src/chip/Chip';

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
            <Chip label={'Default'} />
            <Chip label={'With avatar'} avatar={'star'} />
            <Chip label={'Primary'} color={'primary'} />
            <Chip label={'With avatar'} avatar={'star'} color={'primary'} />
            <Chip label={'With onClick'} onClick={() => alert('clicked')} />
            <Chip label={'With onRequestDelete'} onRequestDelete={() => alert('delete')} />
            <Chip label={'Disabled'} disabled />
            <Chip label={'With avatar'} avatar={'star'} disabled />
            <Chip label={'With onClick'} onClick={() => alert('clicked')} disabled />
            <Chip label={'With onRequestDelete'} onRequestDelete={() => alert('delete')} disabled />
        </div>
    </MuiThemeProvider>
);

render(buttons, document.getElementById('chips'));
