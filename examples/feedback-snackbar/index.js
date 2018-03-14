import React, { PureComponent } from 'react';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from '../../src/button/Button';
import FeedbackSnackbar from '../../src/feedback-snackbar/FeedbackSnackbar.component';
import { ACTION_MESSAGE, ERROR, LOADING, SUCCESS, WARNING } from '../../src/feedback-snackbar/FeedbackSnackbarTypes';

injectTapEventPlugin();

const style = {
    bnt: {
        color: '#ffffff',
        margin: 12,
    },
    success: {
        backgroundColor: '#8ac542',
    },
    warning: {
        backgroundColor: '#ffa726',
    },
    error: {
        backgroundColor: '#f44336',
    },
    loading: {
        backgroundColor: '#757575',
    },
    action: {
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
    },
};

class FeedbackExample extends PureComponent {

    constructor() {
        super();
        this.state = {
            show: false,
            conf: {
                type: '',
                message: '',
                action: '',
                onActionClick: null,
            },
        };
        this.showSnackbar = this.showSnackbar.bind(this);
    }

    // FIXME: Add translator
    showSnackbar(type) {
        let conf;
        switch (type) {
            case SUCCESS:
                conf = {
                    type: SUCCESS,
                    message: 'Action accomplished with success',
                };
                break;
            case LOADING:
                conf = {
                    type: LOADING,
                    message: 'Loading some information...',
                };
                break;
            case ERROR:
                conf = {
                    type: ERROR,
                    message: 'An error occurred processing the request',
                };
                break;
            case WARNING:
                conf = {
                    type: WARNING,
                    message: 'Something went wrong, try again',
                };
                break;
            case ACTION_MESSAGE:
                conf = {
                    type: ACTION_MESSAGE,
                    message: 'Are you sure?',
                    action: 'CONFIRM',
                    onActionClick: () => {
                        this.showSnackbar(LOADING)
                    },
                };
                break;
            default:
                return null;
        }
        this.setState({
            show: true,
            conf,
        });
    }

    render() {
        return (
            <div>
                <Button style={{...style.bnt, ...style.loading}} onClick={() => this.showSnackbar(LOADING)}>Loading</Button>
                <Button style={{...style.bnt, ...style.success}} onClick={() => this.showSnackbar(SUCCESS)}>Success</Button>
                <Button style={{...style.bnt, ...style.error}} onClick={() => this.showSnackbar(ERROR)}>Error</Button>
                <Button style={{...style.bnt, ...style.warning}} onClick={() => this.showSnackbar(WARNING)}>Warning</Button>
                <Button style={{...style.bnt, ...style.action}} onClick={() => this.showSnackbar(ACTION_MESSAGE)}>Action</Button>
                <FeedbackSnackbar show={this.state.show} conf={this.state.conf}/>
            </div>
        );
    }
}

render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <FeedbackExample/>
    </MuiThemeProvider>,
    document.querySelector('#feedback-snackbar'),
);
