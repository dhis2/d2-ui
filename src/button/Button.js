import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
    /**
     * If true, the button will use raised styling
     */
    raised: PropTypes.bool,

    /**
     * If true, the button will use floating action styling
     */
    fab: PropTypes.bool,

    /**
     *  If true, the button will be disabled
     */
    disabled: PropTypes.bool,

    /**
     * The theme color of the button
     */
    color: PropTypes.oneOf(['default', 'primary', 'accent']),

    /**
     * onClick callback, which is triggered when the button is clicked
     *
     * The onClick callback will receive one arguments: TouchTap event targeting the button
     *
     */
    onClick: PropTypes.func.isRequired,
};

export default Button;
