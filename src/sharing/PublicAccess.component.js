/* eslint react/jsx-no-bind: 0 */

import React, { PropTypes } from 'react';
import Rule from './Rule.component';

function constructSecondaryText(canView, canEdit) {
    if (canView) {
        return canEdit
            ? 'Anyone can find, view and edit'
            : 'Anyone can find and view';
    }

    return 'No access';
}

const PublicAccess = ({ canView, canEdit, disabled, onChange }) => (
    <Rule
        accessType="public"
        disabled={disabled}
        primaryText="Public"
        secondaryText={constructSecondaryText(canView, canEdit)}
        onChange={onChange}
        accessOptions={{ canView, canEdit }}
    />
);

PublicAccess.propTypes = {
    canView: PropTypes.bool.isRequired,
    canEdit: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default PublicAccess;
