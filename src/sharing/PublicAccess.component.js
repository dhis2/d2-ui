/* eslint react/jsx-no-bind: 0 */

import React, { PropTypes } from 'react';
import { config } from 'd2/lib/d2';
import Rule from './Rule.component';

config.i18n.strings.add('public_access');

function constructSecondaryText(canView, canEdit) {
    if (canView) {
        return canEdit
            ? 'Anyone can find, view and edit'
            : 'Anyone can find and view';
    }

    return 'No access';
}

const PublicAccess = ({ canView, canEdit, disabled, onChange }, context) => (
    <Rule
        accessType="public"
        disabled={disabled}
        primaryText={context.d2.i18n.getTranslation('public_access')}
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

PublicAccess.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default PublicAccess;
