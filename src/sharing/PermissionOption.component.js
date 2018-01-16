import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SvgIcon from '../svg-icon/SvgIcon';
import MenuItem from 'material-ui/MenuItem';

class PermissionOption extends Component {
    ref = null;

    render = () => {
        if (this.props.disabled) {
            return null;
        }

        return (
            <MenuItem
                insetChildren
                leftIcon={
                    this.props.isSelected ? <SvgIcon icon="Done" /> : undefined
                }
                primaryText={this.props.primaryText}
                value={this.props.value}
                disabled={this.props.disabled}
                onTouchTap={this.props.onTouchTap}
                focusState={this.props.focusState}
            />
        );
    };
}

PermissionOption.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    primaryText: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onTouchTap: PropTypes.func,
    focusState: PropTypes.string,
};

PermissionOption.defaultProps = {
    onTouchTap: undefined,
    focusState: 'none',
};

PermissionOption.muiName = 'MenuItem';
export default PermissionOption;
