/* eslint react/jsx-no-bind: 0 */

import React, { PropTypes } from 'react';
import Rule from './Rule.component';

const ExternalAccess = ({ canView, disabled, onChange }) => (
    <Rule
        accessType="external"
        disabled={disabled}
        disableWritePermission
        primaryText="External access"
        secondaryText={canView ? 'Anyone can view without a login' : 'No access'}
        onChange={onChange}
        accessOptions={{ canView }}
    />
);

ExternalAccess.propTypes = {
    canView: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default ExternalAccess;
