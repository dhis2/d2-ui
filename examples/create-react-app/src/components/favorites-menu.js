import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import FavoritesMenu from '@dhis2/d2-ui-favorites-menu';

export default class FavoritesMenuExample extends React.Component {
    state = {
        snackbar: {
            open: false,
            message: '',
        },
    };

    onFavoritesMenuAction = action => () => {
        this.setState({
            snackbar: {
                open: true,
                message: `Callback for action ${action}...`,
            },
        });
    };

    onFavoritesMenuError = error => {
        this.setState({
            snackbar: {
                open: true,
                message: `Error: ${error}`,
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
            <FavoritesMenu
                d2={this.props.d2}
                favoriteType="chart"
                onNew={this.onFavoritesMenuAction('New')}
                onOpen={this.onFavoritesMenuAction('Open')}
                onSave={this.onFavoritesMenuAction('Save')}
                onSaveAs={this.onFavoritesMenuAction('Save as')}
                onRename={this.onFavoritesMenuAction('Rename')}
                onTranslate={this.onFavoritesMenuAction('Translate')}
                onShare={this.onFavoritesMenuAction('Share')}
                onWriteInterpretation={this.onFavoritesMenuAction('Write interpretation')}
                onDelete={this.onFavoritesMenuAction('Delete')}
                onError={this.onFavoritesMenuError}
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
