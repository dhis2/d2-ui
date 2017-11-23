import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import IconStar from 'material-ui/svg-icons/toggle/star';
import MuiChip from 'material-ui/Chip';
import { createClassName } from '../component-helpers/utils';

const size = '30px';
const color = '#333333';

const chipStyle = {
    margin: 3,
    height: '30px',
    pointer: 'auto',
};

const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: size,
};

const colors = {
    'default': {
        backgroundColor: '#e0e0e0',
        color: color,
    },
    primary: {
        backgroundColor: '#b1deda',
        color: color,
    },
};

const avatarProps = {
    backgroundColor: '#00000011',
    color: color,
    style: {
        height: size,
        width: size,
    },
};

const avatarIcons = {
    star: <IconStar/>,
}

const disabledStyle = {
    cursor: 'auto',
    opacity: 0.5,
};

const getHandlerFunction = (fn, isDisabled) =>
    isDisabled && typeof fn === 'function' ? Function.prototype : fn;

const Chip = ({ avatar, color = 'default', disabled, label, onClick, onRequestDelete, selector }) => {
    const style = {
        ...chipStyle,
        cursor: typeof onClick === 'function' ? 'pointer' : chipStyle.cursor,
        ...(disabled ? disabledStyle : {}),
    };

    const props = {
        className: createClassName('d2-ui-chip', selector),
        style: style,
        labelStyle: labelStyle,
        onClick: getHandlerFunction(onClick, disabled),
        onRequestDelete: getHandlerFunction(onRequestDelete, disabled),
        deleteIconStyle: { height: '22px' },
        ...colors[color],
    };

    const avatarCmp = avatarIcons[avatar] &&
        <Avatar
            icon={avatarIcons[avatar]}
            {...avatarProps}
        />;

    return (
        <MuiChip {...props}>
            {avatarCmp}
            {label}
        </MuiChip>
    );
};

Chip.propTypes = {
    /**
     * If set, adds an avatar to the chip
     */
    avatar: PropTypes.oneOf(['star']),

    /**
     * The color theme of the chip
     */
    color: PropTypes.oneOf(['default', 'primary']),

    /**
     *  If true, the button will be disabled
     */
    disabled: PropTypes.bool,

    /**
     *  If set, adds text content to the chip
     */
    label: PropTypes.string,

    /**
     * onClick callback function, triggered when the button is clicked
     */
    onClick: PropTypes.func,

    /**
     * onRequestDelete callback function, adds a close button to the chip and executes this function when the button is clicked
     */
    onRequestDelete: PropTypes.func,

    /**
     * If set, adds a class to the element in the format d2-ui-button-selector
     */
    selector: PropTypes.string,
};

export default Chip;
