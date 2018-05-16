import React from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Save from 'material-ui-icons/Save';

import i18n from '@dhis2/d2-i18n';

const SaveMenuItem = props => (
    <MenuItem button onClick={props.onSave} disabled={!props.enabled}>
        <ListItemIcon>
            <Save />
        </ListItemIcon>
        <ListItemText primary={i18n.t('Save')} />
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
