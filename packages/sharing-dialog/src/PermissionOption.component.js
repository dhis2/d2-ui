import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SvgIcon } from '@dhis2/d2-ui-core';
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
                onClick={this.props.onClick}
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
    onClick: PropTypes.func,
    focusState: PropTypes.string,
};

PermissionOption.defaultProps = {
    onClick: undefined,
    focusState: 'none',
};

PermissionOption.muiName = 'MenuItem';
export default PermissionOption;
