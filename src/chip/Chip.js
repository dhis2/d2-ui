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

export const clickableStyle = {
    cursor: 'pointer',
};

const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: size,
};

export const colors = {
    'default': {
        backgroundColor: '#e0e0e0',
        color: color,
    },
    primary: {
        backgroundColor: '#b1deda',
        color: color,
    },
};

export const avatarProps = {
    backgroundColor: 'rgba(0,0,0,0.08)',
    color: color,
    style: {
        height: size,
        width: size,
    },
};

export const avatarIcons = {
    star: <IconStar/>,
};

export const disabledStyle = {
    cursor: 'auto',
    opacity: 0.5,
};

const Chip = ({ avatar, color = 'default', disabled, label, onClick, onRequestDelete, selector }) => {
    const style = {
        ...chipStyle,
        ...(typeof onClick === 'function' ? clickableStyle : {}),
        ...(disabled ? disabledStyle : {}),
    };

    const props = {
        className: createClassName('d2-ui-chip', selector),
        style: style,
        labelStyle: labelStyle,
        onClick: disabled ? undefined : onClick,
        onRequestDelete: disabled ? undefined : onRequestDelete,
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
     * If set, adds a class to the element on the format d2-ui-chip-selector
     */
    selector: PropTypes.string,
};

export default Chip;
