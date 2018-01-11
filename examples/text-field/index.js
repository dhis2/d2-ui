import React, { Component } from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from '../../src/text-field/TextField';

injectTapEventPlugin();

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

class TextFields extends Component {
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
                    <TextField
                        label="Text"
                        value={this.state.valueField1}
                        onChange={(value) => this.onChangeValue("valueField1", value)}
                    />
                    <TextField
                        label="Number"
                        type="number"
                        value={this.state.valueField2}
                        onChange={(value) => this.onChangeValue("valueField2", value)}
                    />
                    <TextField
                        label="Default value"
                        type="number"
                        value={this.state.valueField3 || 100}
                        onChange={(value) => this.onChangeValue("valueField3", value)}
                    />
                    <TextField
                        placeholder="Hint text"
                        type="text"
                        value={this.state.singleHintText}
                        onChange={this.onChangeSingleHintText}
                    />
                    <TextField
                        placeholder="Multiline field showing 2 rows and up to 4 rows"
                        type="text"
                        multiline
                        rows={2}
                        rowsMax={4}
                        value={this.state.multiHintText}
                        onChange={this.onChangeMultiHintText}
                    />
                    <TextField
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

render(<TextFields />, document.getElementById('text-fields'));
