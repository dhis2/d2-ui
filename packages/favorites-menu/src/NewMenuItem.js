import React from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import AddBox from 'material-ui-icons/AddBox';

const NewMenuItem = ({ enabled, onNew }) => (
    <MenuItem disabled={!enabled} onClick={onNew}>
        <ListItemIcon>
            <AddBox />
        </ListItemIcon>
        <ListItemText primary="New" />
    </MenuItem>
);

NewMenuItem.defaultProps = {
    enabled: false,
    onNew: null,
};

NewMenuItem.propTypes = {
    enabled: PropTypes.bool,
    onNew: PropTypes.func,
};

export default NewMenuItem;
