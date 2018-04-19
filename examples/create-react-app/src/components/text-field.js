import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {InputField} from '@dhis2/d2-ui-core';

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export default class InputFields extends Component {
    state = {
        multiHintText: '',
        singleHintText: '',
        valueField1: '',
        valueField2: '',
        valueField3: '',
        valueField4: '',
    };

    onChangeValue = (field, value) => {
        this.setState({ [field]: value });
    };

    onChangeMultiHintText = (multiHintText) => {
        this.setState({ multiHintText });
    };

    onChangeSingleHintText = (singleHintText) => {
        this.setState({ singleHintText });
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={style}>
                    <InputField
                        label="Text"
                        value={this.state.valueField1}
                        onChange={(value) => this.onChangeValue("valueField1", value)}
                    />
                    <InputField
                        label="Number"
                        type="number"
                        value={this.state.valueField2}
                        onChange={(value) => this.onChangeValue("valueField2", value)}
                    />
                    <InputField
                        label="Default value"
                        type="number"
                        value={this.state.valueField3 || 100}
                        onChange={(value) => this.onChangeValue("valueField3", value)}
                    />
                    <InputField
                        placeholder="Hint text"
                        type="text"
                        value={this.state.singleHintText}
                        onChange={this.onChangeSingleHintText}
                    />
                    <InputField
                        placeholder="Multiline field showing 2 rows and up to 4 rows"
                        type="text"
                        multiline
                        rows={2}
                        rowsMax={4}
                        value={this.state.multiHintText}
                        onChange={this.onChangeMultiHintText}
                    />
                    <InputField
                        placeholder="Full width"
                        type="text"
                        fullWidth
                        value={this.state.valueField4}
                        onChange={(value) => this.onChangeValue("valueField4", value)}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
