import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import FavoritesDialog from '@dhis2/d2-ui-favorites-dialog';

export default class FavoritesDialogExample extends React.Component {
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
                d2={this.props.d2}
            />
            <Snackbar
                open={this.state.snackbar.open}
                message={this.state.snackbar.message}
                autoHideDuration={4000}
                onRequestClose={this.onSnackbarClose}
            />
        </div>
    );
}
