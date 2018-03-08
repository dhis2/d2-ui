import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui-next/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chip from '../../src/chip/Chip';
import ChipTemp from '../../src/chip/ChipTemp';

import SvgIconTemp from '../../src/svg-icon/SvgIconTemp';

injectTapEventPlugin();

const style = {
    margin: 16,
};

const chipFactory = (label, index) => (
    <Chip
        key={`${label}.${index}`}
        label={label}
        color={index % 2 === 0 ? 'primary' : 'default'}
        avatar={index % 3 === 0 ? 'star' : null}
        disabled={index % 4 === 0}
        onClick={(...args) => console.log.apply(null, ['Click:', ...args])}
        onRequestDelete={index % 5 === 0 ? (...args) => console.log.apply(null, ['Delete:', ...args]) : null}
    />
);


const floatStyle = {
    display: 'inline-block',
    padding: '7px 122px',
    margin: 3,
    background: 'rgba(128,0,255,0.2)',
    borderRadius: 5,
    whiteSpace: 'nowrap',
};
const floatLeftStyle = Object.assign({}, floatStyle, { float: 'left' });
const floatRightStyle = Object.assign({}, floatStyle, { float: 'right', padding: '7px 32px' });

const chipLabels = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'Long dashboard name that is long and has lots of text',
    'Here a chip',
    'There a chip',
    'Everywhere a chip chip',
    'Hello',
    'Another dashboard',
    'Click me for fun!',
    'Don\'t click!',
    'FCK',
    'More chips',
    'Banana chips',
    'Potato chips',
    'Computer chips',
];
const buttons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <div style={style}>
                <div style={floatLeftStyle}>Float left</div>
                <div style={floatRightStyle}>Float right</div>
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
                {chipLabels.map(chipFactory)}
            </div>
            <div style={style}>
                <div style={floatLeftStyle}>Float left</div>
                <div style={floatRightStyle}>Float right</div>
                <ChipTemp label={'Default'} />
                <ChipTemp label={'With avatar'} avatar={<SvgIconTemp icon={'Star'} />} />
                <ChipTemp label={'Primary'} color={'primary'} />
                <Chip label={'With avatar'} avatar={'star'} color={'primary'} />

            </div>
        </div>
    </MuiThemeProvider>
);

render(buttons, document.getElementById('chips'));
