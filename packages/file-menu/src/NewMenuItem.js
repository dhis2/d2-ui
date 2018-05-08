import React from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import AddBox from 'material-ui-icons/AddBox';

import i18n from '@dhis2/d2-i18n';

const NewMenuItem = ({ enabled, onNew }) => (
    <MenuItem disabled={!enabled} onClick={onNew}>
        <ListItemIcon>
            <AddBox />
        </ListItemIcon>
        <ListItemText primary={i18n.t('New')} />
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
