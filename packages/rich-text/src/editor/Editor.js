import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            boldMode: false,
            italicMode: false,
        };

        this.state = {
            ...this.defaultState,
            element: null,
        };
    }

    onKeyDown = (event) => {
        const { key, ctrlKey, metaKey } = event;
        const element = event.target;

        this.setState({ element });

        // bold
        if (key === 'b' && (ctrlKey || metaKey)) {
            this.insertMarkers('bold');
            // italic
        } else if (key === 'i' && (ctrlKey || metaKey)) {
            this.insertMarkers('italic');
        }
    };

    toggleMode = (mode) => {
        const prop = `${mode}Mode`;

        this.setState({ [prop]: !this.state[prop] });
    };

    insertMarkers = (mode) => {
        const element = this.state.element;
        const { selectionStart, selectionEnd, value } = element;

        this.toggleMode(mode);

        let marker;

        switch (mode) {
            case 'italic':
                marker = '_';
                break;
            case 'bold':
                marker = '*';
                break;
            default:
                return;
        }

        let newValue;

        if (selectionStart >= 0 && selectionStart === selectionEnd) {
            newValue = `${value}${marker}`;
        } else if (selectionStart >= 0) {
            newValue = [
                value.slice(0, selectionStart),
                value.slice(selectionStart, selectionEnd),
                value.slice(selectionEnd),
            ].join(marker);

            this.toggleMode(mode);
        }

        if (this.props.onEdit) {
            this.props.onEdit(newValue);
        }
    };

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
};

export default Editor;
