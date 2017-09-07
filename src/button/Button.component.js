import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

/**
 * D2 button component, modeled after Material UI v1
 * @property {boolean} raised If true, the button will use raised styling.
 * @property {boolean} fab If true, will use floating action button styling.
 * @property {boolean} disabled If true, the button will be disabled.
 * @property {string} color The theme color of the component ('default', 'primary', 'accent').
 * @property {function} onClick Callback function fired when the button is touch-tapped.
 * @property {node} children The content of the button.
 */
const Button = ({ raised, fab, color, disabled, onClick, children }) => {
    let MuiButton;

    if (fab) {
        MuiButton = FloatingActionButton;
    } else if (raised) {
        MuiButton = RaisedButton;
    } else {
        MuiButton = FlatButton;
    }

    return (
        <MuiButton
            label={typeof children === 'string' ? children : null}
            primary={color === 'primary'}
            secondary={color === 'accent'}
            disabled={disabled}
            onTouchTap={onClick}
        >
            {typeof children !== 'string' ? children : null}
        </MuiButton>
    );
};

Button.propTypes = {
    raised: PropTypes.bool,
    fab: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
