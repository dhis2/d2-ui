import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@dhis2/d2-ui-core';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class PermissionOption extends Component {
    render = () => {
        if (this.props.disabled) {
            return null;
        }

        return (
            <MenuItem
                disabled={this.props.disabled}
                onClick={this.props.onClick}
                selected={this.props.isSelected}
            >
                {this.props.isSelected &&
                <ListItemIcon>
                    <SvgIcon icon="Done" />
                </ListItemIcon>
                }
                <ListItemText inset primary={this.props.primaryText}/>
            </MenuItem>
        );
    };
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
