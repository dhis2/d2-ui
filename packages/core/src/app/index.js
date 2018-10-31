import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from '../theme/theme';

class D2UIApp extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={this.props.muiTheme}>
                <div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

D2UIApp.propTypes = {
    muiTheme: PropTypes.object,
    children: PropTypes.node,
};

D2UIApp.defaultProps = {
    muiTheme: getMuiTheme(theme),
};

export default D2UIApp;
