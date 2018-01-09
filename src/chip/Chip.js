import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import IconStar from 'material-ui/svg-icons/toggle/star';
import MuiChip from 'material-ui/Chip';
import { createClassName } from '../component-helpers/utils';

const chipSize = '30px';
const chipColor = '#333333';

const chipStyle = {
    margin: 3,
    height: chipSize,
    pointer: 'auto',
};

export const clickableStyle = {
    cursor: 'pointer',
};

const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '30px',
};

export const colors = {
    default: {
        color: chipColor,
        backgroundColor: '#e0e0e0',
    },
    primary: {
        color: chipColor,
        backgroundColor: '#b1deda',
    },
};

export const avatarProps = {
    color: chipColor,
    backgroundColor: 'rgba(0,0,0,0.08)',
    style: {
        height: chipSize,
        width: chipSize,
    },
};

export const avatarIcons = {
    star: <IconStar />,
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
        style,
        labelStyle,
        className: createClassName('d2-ui-chip', selector),
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

    const wrapperClassName = createClassName('d2-ui-chip-wrapper', selector);
    const wrapperStyle = { display: 'inline-block', verticalAlign: 'top' };
    return (
        <div className={wrapperClassName} style={wrapperStyle}>
            <MuiChip {...props}>
                {avatarCmp}
                {label}
            </MuiChip>
        </div>
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

Chip.defaultProps = {
    avatar: null,
    disabled: false,
    label: null,
    onClick: undefined,
    onRequestDelete: undefined,
    selector: null,
};

export default Chip;
