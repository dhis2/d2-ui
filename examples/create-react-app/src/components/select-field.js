import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';

import {SelectField} from 'd2-ui-core';

const items = [{
    id: 'cat',
    name: 'Cat',
}, {
    id: 'mouse',
    name: 'Mouse',
}, {
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

export default function SelectFieldExample (props) {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={style}>
                <SelectField
                    label="Select animal"
                    items={items}
                />
                <SelectField
                    items={items}
                    value="cat"
                />
                <SelectField
                    label="Select animal"
                    items={items}
                />
                <SelectField
                    label="Select multiple"
                    items={items}
                    value={['cat', 'dog']}
                    multiple
                />
                <SelectField
                    label="Select animal"
                    value="dog"
                    items={items}
                />
                <SelectField
                    label="onChange event"
                    items={items}
                    onChange={item => alert(JSON.stringify(item))}
                />
                <SelectField
                    label="Children"
                    value="cat"
                    onChange={item => alert(item)}
                >
                    <MenuItem value={'none'}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="cat" primaryText="Cat" />
                    <MenuItem value="mouse" primaryText="Mouse" />
                    <MenuItem value="dog" primaryText="Dog" />
                </SelectField>
                <SelectField
                    label="Async with spinner"
                    loading
                />
                <SelectField
                    label="Async with string"
                    loading="Loading..."
                />
                <SelectField
                    errorText="Error text"
                    items={items}
                />
            </div>
        </MuiThemeProvider>
    );
}
