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
    };

    onChangeMultiHintText = (multiHintText) => {
        this.setState({ multiHintText });
    }

    onChangeSingleHintText = (singleHintText) => {
        this.setState({ singleHintText });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={style}>
                    <TextField
                        label='Text'
                        onChange={() => { }}
                    />
                    <TextField
                        label='Number'
                        type='number'
                        onChange={() => { }}
                    />
                    <TextField
                        label='Default value'
                        type='number'
                        value={100}
                        onChange={() => { }}
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
                        onChange={() => { }}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

render(<TextFields />, document.getElementById('text-fields'));
