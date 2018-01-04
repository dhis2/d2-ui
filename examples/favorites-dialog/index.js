import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import log from 'loglevel';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import d2Lib from 'd2/lib/d2';
import FavoritesDialog from '../../src/favorites/FavoritesDialog';

class FavoritesDialogExample extends React.Component {
    state = {
        favoritesDialog: {
            open: false,
            type: 'chart',
        },
        snackbar: {
            open: false,
            message: '',
        },
    };

    getChildContext = () => ({
        d2: {
            i18n: {
                getTranslation(key) {
                    return key;
                },
            },
        },
    });

    toggleDialog = type => () => {
        this.setState({
            favoritesDialog: {
                type,
                open: !this.state.favoritesDialog.open,
            },
        });
    };

    onFavoriteSelect = id => {
        this.setState({
            snackbar: {
                open: true,
                message: `Selected favorite ID: ${id}`,
            },
        });
    };

    onSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    render = () => (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <div style={{ padding: 16 }}>
                    <RaisedButton
                        onClick={this.toggleDialog('chart')}
                        label="Open charts favorites"
                    />
                </div>
                <div style={{ padding: 16 }}>
                    <RaisedButton
                        onClick={this.toggleDialog('pivot')}
                        label="Open pivot table favorites"
                    />
                </div>
                <div style={{ padding: 16 }}>
                    <RaisedButton onClick={this.toggleDialog('map')} label="Open maps favorites" />
                </div>
                <FavoritesDialog
                    open={this.state.favoritesDialog.open}
                    type={this.state.favoritesDialog.type}
                    onRequestClose={this.toggleDialog(this.state.type)}
                    onFavoriteSelect={this.onFavoriteSelect}
                />
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.onSnackbarClose}
                />
            </div>
        </MuiThemeProvider>
    );
}

FavoritesDialogExample.childContextTypes = {
    d2: PropTypes.object,
};

const el = document.getElementById('favoritesDialog');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

d2Lib.config.baseUrl = baseUrl;
d2Lib
    .init({ baseUrl })
    .then(d2 => {
        render(<FavoritesDialogExample />, el);
    })
    .catch(error => {
        log.error('Failed to initialize d2', error);
        render(<div>Failed to initialise d2: {error}</div>, el);
    });
