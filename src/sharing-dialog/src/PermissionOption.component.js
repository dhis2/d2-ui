import React from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/Done';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const PermissionOption = props => {
    if (props.disabled) {
        return null;
    }

    return (
        <MenuItem
            disabled={props.disabled}
            onClick={props.onClick}
            selected={props.isSelected}
        >
            {props.isSelected &&
            <ListItemIcon>
                <DoneIcon />
            </ListItemIcon>
            }
            <ListItemText inset primary={props.primaryText}/>
        </MenuItem>
    );
}

PermissionOption.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool,
    primaryText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

PermissionOption.defaultProps = {
    isSelected: false,
};

export default PermissionOption;
