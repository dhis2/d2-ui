import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import IconStar from 'material-ui/svg-icons/toggle/star';
import MuiChip from 'material-ui/Chip';
import { createClassName } from '../component-helpers/utils';

const styles = {
    colors: {
        'default': {
            backgroundColor: '#e0e0e0',
            color: '#333333',
        },
        primary: {
            backgroundColor: '#9bd9f3',
            color: '#333333',
        },
    },
    avatar: {
        color: '#444',
        style: {
            height: '30px',
            width: '30px',
        },
    },
};

const avatarMap = {
    star: <Avatar icon={<IconStar/>} {...styles.avatar} />,
};

const Chip = ({ avatar, color = 'default', disabled, label, onClick, onRequestDelete, selector }) => {
    const props = {
        style: {
            margin: 3,
            height: '30px',
            cursor: 'pointer',
        },
        labelStyle: {
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: '30px',
        },
        className: createClassName('d2-ui-chip', selector),
        onClick: disabled && typeof onClick === 'function' ? Function.prototype : onClick,
        onRequestDelete: disabled && typeof onRequestDelete === 'function' ? Function.prototype : onRequestDelete,
        backgroundColor: (styles.colors[color] || {}).backgroundColor + (disabled ? '66' : ''),
        labelColor: (styles.colors[color] || {}).color + (disabled ? '66' : ''),
    };

    return (
        <MuiChip {...props}>
            {avatarMap[avatar]}
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
