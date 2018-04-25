import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';

export default class SharingExample extends React.Component {
    state = {
        open: false,
        id: '',
        type: '',
    }

    getChildContext = () => ({
        d2: {
            i18n: {
                getTranslation(key) {
                    return key;
                },
            },
        },
    });

    handleOpen = (type, id) => () => {
        this.setState({
            open: true, id, type,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render = () => {
        const examples = [
            { type: 'category', id: 'veGzholzPQm' },
            { type: 'categoryOption', id: 'FbLZS3ueWbQ' },
            { type: 'categoryOption', id: 'K4gwuiVvW3z' },
        ];

        return (<MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={{ padding: 32 }}>
                <SharingDialog
                    open={this.state.open}
                    id={this.state.id}
                    type={this.state.type}
                    onRequestClose={this.handleClose}
                    d2={this.props.d2}
                />
                { examples.map(({ type, id }) => (
                    <div key={type + id} style={{ padding: 16 }}>
                        <RaisedButton key={type} label={`${type}/${id}`} onClick={this.handleOpen(type, id)} />
                    </div>
                ))}
            </div>
        </MuiThemeProvider>)
    }
}

SharingExample.childContextTypes = {
    d2: PropTypes.object,
};
