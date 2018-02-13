import React, { Component } from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiThemeProvider as NewMuiThemeProvider } from 'material-ui-next/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectField from '../../src/select-field/SelectField';
import { MenuItem } from 'material-ui-next/Menu';
import { FormControl } from 'material-ui-next/Form';
import Input, { InputLabel } from 'material-ui-next/Input';
import { Chip } from 'material-ui-next/Chip';

import SelectTemp from '../../src/select-field/SelectTemp';
import TextFieldTemp from '../../src/text-field/TextFieldTemp';


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

class SelectFields extends Component {
    state = {
        selectValueField1: '',
        selectValueField2: '',
        selectValueField3: [],
    };

    onChangeValue = (field, value) => {
            console.log(field, value);
            this.setState({ [field]: value });
    }
    
    render() {
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
                            value='cat'
                        />
                        <SelectField
                            label='Select animal'
                            items={items}
                        />
                        <SelectField
                            label='Select multiple'
                            items={items}
                            value={['cat', 'dog']}
                            multiple={true}
                        />
                        <SelectField
                            label='Select animal'
                            value='dog'
                            items={items}
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
                        <SelectField
                            label='Async with spinner'
                            loading={true}
                        />
                        <SelectField
                            label='Async with string'
                            loading='Loading...'
                        />
                        <SelectField
                            errorText='Error text'
                            items={items}
                        />
                    </div>
                </MuiThemeProvider>
        
                        <h3> Material-ui v.1 </h3>
                {/* <NewMuiThemeProvider theme={theme} >*/}
                    <div style={style}>
                        <TextFieldTemp
                            select
                            label={'TextField component with native Select'}
                            value={this.state.selectValueField1}
                            onChange={(event) => this.onChangeValue("selectValueField1", event.target.value)}
                            SelectProps={{native: true}}
                        >
                            {items.map((option) => {
                                return( <option key={option.id} value={option.id}> {option.name} </option> )
                            })}                    
                        </TextFieldTemp>
                        <FormControl>
                        <InputLabel>{'Simple Select component'}</InputLabel>
                            <SelectTemp
                                value={this.state.selectValueField2}    
                                onChange={(event) => this.onChangeValue("selectValueField2", event.target.value)}
                                >         
                                {items.map(item => {
                                    return (<MenuItem key={item.id} value={item.name}> {item.name} </MenuItem>);
                                })}        
                            </ SelectTemp>
                    </FormControl>

                    <FormControl >
                    <InputLabel>{'Multiple select component'}</InputLabel>
                        <SelectTemp
                            multiple
                            value={this.state.selectValueField3}
                            onChange={(event) => this.onChangeValue('selectValueField3', event.target.value)}
                        >
                            {items.map(item => {
                                return (<MenuItem key={item.id} value={item.name}> {item.name} </MenuItem>);
                            })}
                        </SelectTemp>
                    </FormControl>

                    </div>
                {/* </NewMuiThemeProvider> */}  
        </div>
    );
}
    
}
render(<SelectFields />, document.getElementById('select-fields'));
    