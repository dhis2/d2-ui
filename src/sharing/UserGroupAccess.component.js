/* eslint react/jsx-no-bind: 0 */

import React, { PropTypes } from 'react';
import Rule from './Rule.component';

const UserGroupAccess = ({ nameOfGroup, groupType, canView, canEdit, onChange, onRemove }) => (
    <Rule
        disableNoAccess
        accessType={groupType}
        primaryText={nameOfGroup}
        secondaryText={groupType}
        onChange={onChange}
        onRemove={onRemove}
        accessOptions={{
            canView,
            canEdit,
        }}
    />
);

UserGroupAccess.propTypes = {
    nameOfGroup: PropTypes.string.isRequired,
    groupType: PropTypes.oneOf(['user', 'userGroup']),
    canView: PropTypes.bool.isRequired,
    canEdit: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default UserGroupAccess;
