import React from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Save from 'material-ui-icons/Save';

const SaveMenuItem = props => (
    <MenuItem button={true} onClick={props.onSave} disabled={!props.enabled}>
        <ListItemIcon>
            <Save />
        </ListItemIcon>
        <ListItemText primary="Save" />
    </MenuItem>
);

SaveMenuItem.propTypes = {
    enabled: PropTypes.bool,
    onSave: PropTypes.func,
};

export default SaveMenuItem;
