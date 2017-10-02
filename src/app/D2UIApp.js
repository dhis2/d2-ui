import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import { init } from 'd2/lib/d2';
import Paper from 'material-ui/Paper';
import ErrorMessage from '../messages/ErrorMessage.component.js';

export default class D2UIApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isErrored: false,
        };
    }

    getChildContext() {
        return {
            d2: this.state.d2,
        };
    }

    componentDidMount() {
        init(this.props.initConfig)
            .then(d2 => this.setState({ d2 }))
            .catch(errorMessage => this.setState({
                isErrored: true,
                error: (
                    <Paper style={{ padding: 16 }}>
                        <ErrorMessage message={errorMessage} />
                    </Paper>
                ),
            }));
    }

    render() {
        const { LoadingComponent } = this.props;

        let content;
        if (this.state.isErrored) {
            content = this.state.error;
        } else if (this.state.d2) {
            content = this.props.children;
        } else {
            content = <LoadingComponent />;
        }

        return (
            <MuiThemeProvider muiTheme={this.props.muiTheme}>
                {content}
            </MuiThemeProvider>
        );
    }
}

D2UIApp.childContextTypes = {
    d2: PropTypes.object,
};

D2UIApp.defaultProps = {
    muiTheme: getMuiTheme(),
    LoadingComponent: CircularProgress,
};
