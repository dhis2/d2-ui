import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import FileMenu from '@dhis2/d2-ui-file-menu';

export default class FileMenuExample extends React.Component {
    state = {
        snackbar: {
            open: false,
            message: '',
        },
    };

    onFileMenuAction = action => () => {
        this.setState({
            snackbar: {
                open: true,
                message: `Callback for action ${action}...`,
            },
        });
    };

    onFileMenuError = error => {
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
            <FileMenu
                d2={this.props.d2}
                fileType="chart"
                onNew={this.onFileMenuAction('New')}
                onOpen={this.onFileMenuAction('Open')}
                onSave={this.onFileMenuAction('Save')}
                onSaveAs={this.onFileMenuAction('Save as')}
                onRename={this.onFileMenuAction('Rename')}
                onTranslate={this.onFileMenuAction('Translate')}
                onShare={this.onFileMenuAction('Share')}
                onWriteInterpretation={this.onFileMenuAction('Write interpretation')}
                onDelete={this.onFileMenuAction('Delete')}
                onError={this.onFileMenuError}
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
