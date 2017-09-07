import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// D2 button component
// Modeled after Material UI v1: https://material-ui-1dab0.firebaseapp.com/api/button/
// Props:
// raised (boolean, default false) - if true, the button will use raised styling.
// fab (boolean, default false) - If true, will use floating action button styling.
// disabled (boolean, default false) - If true, the button will be disabled.
// color ('default', 'primary', 'accent') - The color of the component (from theme palette).
// onClick (function) - Callback function fired when the button is touch-tapped.
// children * (node) - The content of the button.

const Button = ({ raised, fab, color, disabled, onClick, style, children }) => {
    const MuiButton = raised ? RaisedButton : fab ? FloatingActionButton: FlatButton;

    return (
        <MuiButton
            label={typeof children === 'string' ? children : null}
            primary={color === 'primary'}
            secondary={color === 'accent'}
            disabled={disabled}
            onTouchTap={onClick}
            style={style}
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
    style: PropTypes.object,
};

export default Button;
