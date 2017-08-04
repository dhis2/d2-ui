/* eslint react/jsx-no-bind: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import { config } from 'd2/lib/d2';

import Rule from './Rule.component';

config.i18n.strings.add('external_access');
config.i18n.strings.add('anyone_can_view_without_a_login');
config.i18n.strings.add('no_access');

const ExternalAccess = ({ canView, disabled, onChange }, context) => (
    <Rule
        accessType="external"
        disabled={disabled}
        disableWritePermission
        primaryText={context.d2.i18n.getTranslation('external_access')}
        secondaryText={canView ?
          context.d2.i18n.getTranslation('anyone_can_view_without_a_login') :
          context.d2.i18n.getTranslation('no_access')}
        onChange={onChange}
        accessOptions={{ canView }}
    />
);

ExternalAccess.propTypes = {
    canView: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ExternalAccess.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default ExternalAccess;
