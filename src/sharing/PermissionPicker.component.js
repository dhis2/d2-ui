/* eslint react/jsx-no-bind: 0 */

import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

injectTapEventPlugin();

function getAccessIcon(accessOptions) {
    if (accessOptions.canView) {
        return accessOptions.canEdit ? 'create' : 'remove_red_eye';
    }

    return 'not_interested';
}

function createMenuItem(text, canView, canEdit, isSelected, disabled) {
    return !disabled && (
        <MenuItem
            insetChildren
            value={{ canView, canEdit }}
            primaryText={text}
            leftIcon={
                <FontIcon className="material-icons">
                    {isSelected ? 'done' : ''}
                </FontIcon>
            }
        />
    );
}

const PermissionPicker = ({ accessOptions, onChange, disabled, disableWritePermission, disableNoAccess }) => (
    <IconMenu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        touchTapCloseDelay={1}
        menuStyle={{ width: '200px' }}
        onChange={(event, value) => onChange(value)}
        iconButtonElement={
            <IconButton
                disabled={disabled}
                iconClassName="material-icons"
            >
                {getAccessIcon(accessOptions)}
            </IconButton>
        }
    >
        { createMenuItem('Can edit and view', true, true, accessOptions.canEdit, disableWritePermission) }
        { createMenuItem('Can view only', true, false, accessOptions.canView && !accessOptions.canEdit) }
        { createMenuItem('No access', false, false, !accessOptions.canView && !accessOptions.canEdit, disableNoAccess) }
    </IconMenu>
);

PermissionPicker.propTypes = {
    accessOptions: PropTypes.shape({
        canView: PropTypes.bool.isRequired,
        canEdit: PropTypes.bool,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    disableWritePermission: PropTypes.bool,
    disableNoAccess: PropTypes.bool,
};

export default PermissionPicker;
