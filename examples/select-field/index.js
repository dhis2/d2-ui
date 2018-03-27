import React, { Component } from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MenuItem } from 'material-ui-next/Menu';
import Checkbox from 'material-ui-next/Checkbox';
import { ListItemText } from 'material-ui-next/List';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectField from '../../src/select-field/SelectField';

import SelectTemp from '../../src/select-field/SelectTemp';


injectTapEventPlugin();

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

class SelectFields extends Component {
    state = {
        selectValueField1: '',
        selectValueField2: '',
        selectValueField3: [],
        selectValueField4: '',
        selectValueField5: '',
        selectValueField6: '',
    };

    onChangeValue = (field, value) => {
        this.setState({ [field]: value });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h3> Material-ui v.0 </h3>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div style={style}>
                        <SelectField
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

                <h3> Material-ui v.1 </h3>
                <div style={style}>
                    <SelectTemp
                        onChange={event => this.onChangeValue('selectValueField1', event.target.value)}
                        value={this.state.selectValueField1}
                        inputLabelText={'Native Select'}
                        native
                    >
                        {<option defaultValue={''} />}
                        {items.map(item => (<option key={item.id} defaultValue={item.name} value={item.name}> {item.name} </option>))}
                    </SelectTemp>

                    <SelectTemp
                        onChange={event => this.onChangeValue('selectValueField2', event.target.value)}
                        value={this.state.selectValueField2}
                        inputLabelText={'Simple Select'}
                    >
                        {items.map(item => (<MenuItem key={item.id} value={item.name}> {item.name} </MenuItem>))}
                    </SelectTemp>

                    <SelectTemp
                        multiple
                        value={this.state.selectValueField3}
                        onChange={event => this.onChangeValue('selectValueField3', event.target.value)}
                        inputLabelText={'Multiple select component'}
                        renderValue={selected => selected.join(', ')}
                    >
                        {items.map(item => (
                            <MenuItem key={item.id} value={item.name}>
                                <Checkbox checked={this.state.selectValueField3.indexOf(item.name) > -1} />
                                <ListItemText primary={item.name} />
                            </MenuItem>
                        ))}
                    </SelectTemp>

                    <SelectTemp
                        value={this.state.selectValueField4}
                        onChange={event => this.onChangeValue('selectValueField4', event.target.value)}
                        inputLabelText={'Async with spinner'}
                        loading
                    />

                    <SelectTemp
                        value={this.state.selectValueField5}
                        onChange={event => this.onChangeValue('selectValueField5', event.target.value)}
                        inputLabelText={'Async with string'}
                        loading={'Loading...'}
                    />

                    <SelectTemp
                        value={this.state.selectValueField6}
                        onChange={event => this.onChangeValue('selectValueField6', event.target.value)}
                        inputLabelText={'Error text'}
                        error
                    >
                        {items.map(item => (<MenuItem key={item.id} value={item.name}> {item.name} </MenuItem>))}
                    </SelectTemp>
                </div>
            </div>
        );
    }
}
render(<SelectFields />, document.getElementById('select-fields'));

