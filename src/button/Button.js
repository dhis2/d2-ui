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

    if (fab) { // Always raised
        MuiButton = FloatingActionButton;
    } else if (raised) {
        MuiButton = RaisedButton;
    } else {
        MuiButton = FlatButton;
    }

    const props = {
        label: typeof children === 'string' ? children : null,
        primary: color === 'primary' || null,
        secondary: color === 'accent' || null,
        disabled: disabled,
        onTouchTap: onClick,
    };

    // Property gives error on FAB buttons in Material UI 0.19
    if (fab) {
        delete props.primary;
    }

    return (
        <MuiButton {...props}>
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
