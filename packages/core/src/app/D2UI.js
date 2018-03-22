import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class D2UI extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={this.props.muiTheme}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

D2UI.propTypes = {
    muiTheme: PropTypes.object,
    children: PropTypes.node,
};

D2UI.defaultProps = {
    muiTheme: getMuiTheme(),
};

export default D2UI;
