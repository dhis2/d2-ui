import React from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Save from '@material-ui/icons/Save';

const SaveMenuItem = props => (
    <MenuItem button onClick={props.onSave} disabled={!props.enabled}>
        <ListItemIcon>
            <Save />
        </ListItemIcon>
        <ListItemText primary="Save" />
    </MenuItem>
);

SaveMenuItem.defaultProps = {
    enabled: false,
    onSave: null,
};

SaveMenuItem.propTypes = {
    enabled: PropTypes.bool,
    onSave: PropTypes.func,
};

export default SaveMenuItem;
