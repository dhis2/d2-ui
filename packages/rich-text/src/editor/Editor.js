import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertCtrlKey from './convertCtrlKey';

class Editor extends Component {
    onKeyDown = (event) => {
        convertCtrlKey(event, this.props.onEdit);
    }

    render() {
        const { children } = this.props;

        return <div onKeyDown={this.onKeyDown}>{children}</div>;
    }
}

Editor.defaultProps = {
    onEdit: null,
};

Editor.propTypes = {
    onEdit: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default Editor;
