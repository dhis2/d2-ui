import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectField from '../../src/select-field/SelectField';
import MenuItem from 'material-ui/MenuItem';

injectTapEventPlugin();

const items = [{
    id: 'cat',
    name: 'Cat',
},{
    id: 'mouse',
    name: 'Mouse',
},{
    id: 'dog',
    name: 'Dog',
}];


const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const selectFields = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={style}>
            <SelectField
                items={items}
                onChange={() => {}}
            />
            <SelectField
                items={items}
                value='cat'
                onChange={() => {}}
            />
            <SelectField
                label='Select animal'
                items={items}
                onChange={() => {}}
            />
            <SelectField
                label='Select animal'
                value='dog'
                items={items}
                onChange={() => {}}
            />
            <SelectField
                label='onChange event'
                items={items}
                onChange={(item) => alert(JSON.stringify(item))}
            />
            <SelectField
                label='Children'
                value='cat'
                onChange={(item) => alert(item)}
            >
                <MenuItem value={'none'}>
                    <em>None</em>
                </MenuItem>
                <MenuItem value='cat' primaryText='Cat' />
                <MenuItem value='mouse' primaryText='Mouse' />
                <MenuItem value='dog' primaryText='Dog' />
            </SelectField>
        </div>
    </MuiThemeProvider>
);

render(selectFields, document.getElementById('select-fields'));
