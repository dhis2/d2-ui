import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';

import { ACTION_MESSAGE, ERROR, LOADING, SUCCESS, WARNING } from './FeedbackSnackbarTypes';
import FeedbackSnackbarBody from './feedback-snackbar-body/FeedbackSnackbarBody.component';

const styles = {
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
};

class FeedbackSnackbar extends PureComponent {

    static propTypes = {
        show: PropTypes.bool.isRequired,
        conf: PropTypes.shape({
            type: PropTypes.string,
            message: PropTypes.string,
            action: PropTypes.string,
            onActionClick: PropTypes.func,
        }),
    };

    static defaultProps = {
        conf: {
            type: '',
            message: '',
            action: '',
            onActionClick: null,
        },
    };

    static getStyle(type) {
        switch (type) {
            case SUCCESS:
                return styles.success;
            case LOADING:
                return styles.loading;
            case ERROR:
                return styles.error;
            case WARNING:
                return styles.warning;
            default:
                return null;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            conf: props.conf,
        };
    }

    componentWillReceiveProps(nextProps) {
        const newProps = Object.assign({}, nextProps);

        if (typeof this.state.snackbarTimerId !== 'undefined') {
            clearTimeout(this.state.snackbarTimerId);
        }

        // Hack to hide previous snackbar before changing its style
        if (this.props.show && newProps.show) {
            const newShow = nextProps.show;
            const newConf = nextProps.conf;
            newProps.show = false;
            newProps.conf = this.props.conf;
            this.state.snackbarTimerId = setTimeout(() => {
                this.setState({
                    show: newShow,
                    conf: newConf,
                });
            }, 500);
        }

        this.setState({
            show: newProps.show,
            conf: newProps.conf,
        });
    }

    handleRequestClose = () => {
        if (this.props.conf.type !== LOADING) {
            this.setState({
                show: false,
            });
        }
    };

    render() {
        const snackBarContent = this.state.conf.type === ACTION_MESSAGE
            ? this.state.conf.message
            : (<FeedbackSnackbarBody type={this.state.conf.type} message={this.state.conf.message}/>);

        return (
            <Snackbar
                action={this.state.conf.action}
                onActionClick={this.state.conf.onActionClick}
                open={this.state.show}
                message={snackBarContent}
                onRequestClose={this.handleRequestClose}
                bodyStyle={FeedbackSnackbar.getStyle(this.state.conf.type)}
            />
        );
    }
}

export default FeedbackSnackbar;
