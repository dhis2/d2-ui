import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chip from '../../src/chip/Chip';

injectTapEventPlugin();

const style = {
    margin: 16,
};

const chipFactory = (label, index) => (
    <Chip
        key={`${label}.${index}`}
        label={label}
        color={index % 2 ? 'primary' : 'default'}
        avatar={index % 3 === 0 ? 'star' : null}
        disabled={index % 4 === 1}
        onClick={(...args) => console.log.apply(null, ['Click:', ...args])}
        onRequestDelete={index % 4 === 2 ? (...args) => console.log.apply(null, ['Delete:', ...args]) : null}
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

const buttons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <div style={style}>
                <div style={floatLeftStyle}>Float left</div>
                <div style={floatRightStyle}>Float right</div>
                <Chip label={'Default'}/>
                <Chip label={'With avatar'} avatar={'star'}/>
                <Chip label={'Primary'} color={'primary'}/>
                <Chip label={'With avatar'} avatar={'star'} color={'primary'}/>
                <Chip label={'With onClick'} onClick={() => alert('clicked')}/>
                <Chip label={'With onRequestDelete'} onRequestDelete={() => alert('delete')}/>
                <Chip label={'Disabled'} disabled/>
                <Chip label={'With avatar'} avatar={'star'} disabled/>
                <Chip label={'With onClick'} onClick={() => alert('clicked')} disabled/>
                <Chip label={'With onRequestDelete'} onRequestDelete={() => alert('delete')} disabled/>
                {'Long dashboard name that is long as has lots of text|Here a chip|There a chip|Everywhere a chip chip|Hello|Another dashboard|Click me for fun!|Don\'t click!|FCK|More chips|Banana chips|Potato chips|Computer chips'.split('|').map((x, i) => chipFactory(x, i))}
            </div>
        </div>
    </MuiThemeProvider>
);

render(buttons, document.getElementById('chips'));
