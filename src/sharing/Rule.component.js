import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import PermissionPicker from './PermissionPicker.component';

const styles = {
    ruleView: {
        fontWeight: '400',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px',
    },
    ruleDescription: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 16,
    },
};

function getAccessIcon(userType) {
    switch (userType) {
    case 'user': return 'person';
    case 'userGroup': return 'group';
    case 'external': return 'public';
    case 'public': return 'business';
    default: return 'person';
    }
}

const Rule = ({ accessType, primaryText, secondaryText, accessOptions,
                onChange, onRemove, disabled, disableWritePermission, disableNoAccess }) => (
    // eslint-disable-next-line
    <div style={styles.ruleView}>
        <FontIcon className="material-icons">
            {getAccessIcon(accessType)}
        </FontIcon>
        <div style={styles.ruleDescription}>
            <div>{primaryText}</div>
            <div style={{ color: '#818181', paddingTop: 4 }}>{secondaryText || ' '}</div>
        </div>

        <PermissionPicker
            disableWritePermission={disableWritePermission}
            disableNoAccess={disableNoAccess}
            accessOptions={accessOptions}
            onChange={onChange}
            disabled={disabled}
        />

        <IconButton
            disabled={!onRemove}
            iconStyle={{ color: '#bbbbbb' }}
            iconClassName="material-icons"
            onClick={onRemove || (() => {})}
        >clear</IconButton>
    </div>
);

Rule.propTypes = {
    accessType: PropTypes.oneOf(['user', 'userGroup', 'external', 'public']).isRequired,
    primaryText: PropTypes.string.isRequired,
    accessOptions: PropTypes.object.isRequired,
    secondaryText: PropTypes.string,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    disabled: PropTypes.bool,
    disableWritePermission: PropTypes.bool,
    disableNoAccess: PropTypes.bool,
};

export default Rule;
