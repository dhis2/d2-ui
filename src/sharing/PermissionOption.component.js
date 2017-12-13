import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';

class PermissionOption extends Component {
    render = () => {
        if (this.props.disabled)
            return null;

        return (
            <MenuItem
                insetChildren
                leftIcon={
                    <FontIcon className="material-icons">
                        {this.props.icon}
                    </FontIcon>
                }
                { ...this.props}
            />
        );
    }
}

PermissionOption.propTypes = {
    disabled: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    primaryText: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
};

PermissionOption.muiName = 'MenuItem';
export default PermissionOption;