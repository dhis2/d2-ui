import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import withProps from 'recompose/withProps';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';
import BusinessIcon from '@material-ui/icons/Business';
import PermissionPicker from './PermissionPicker.component';
import { accessStringToObject, accessObjectToString } from './utils';

const icons = {
    user: PersonIcon,
    userGroup: GroupIcon,
    external: PublicIcon,
    public: BusinessIcon,
};

const SvgIcon = ({ userType }) => {
    const Icon = icons[userType] || PersonIcon;

    return (
        <Icon color="action" />
    );
};

SvgIcon.propTypes = {
    userType: PropTypes.string.isRequired,
};

const styles = {
    accessView: {
        fontWeight: '400',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px',
    },
    accessDescription: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 16,
    },
};

const d2Context = {
    d2: PropTypes.object.isRequired,
};

const useAccessObjectFormat = props => ({
    ...props,
    access: accessStringToObject(props.access),
    onChange: newAccess => props.onChange(accessObjectToString(newAccess)),
});

export const Access = ({
    access,
    accessType,
    accessOptions,
    primaryText,
    secondaryText,
    onChange,
    onRemove,
    disabled,
}) => (
    <div style={styles.accessView}>
        <SvgIcon userType={accessType} />
        <div style={styles.accessDescription}>
            <div>{primaryText}</div>
            <div style={{ color: '#818181', paddingTop: 4 }}>
                {secondaryText || ' '}
            </div>
        </div>
        <PermissionPicker
            access={access}
            accessOptions={accessOptions}
            onChange={onChange}
            disabled={disabled}
        />
        <IconButton
            disabled={!onRemove}
            onClick={onRemove || (() => {})}
        >
            <ClearIcon color={!onRemove ? "disabled" : "action"} />
        </IconButton>
    </div>
);

Access.contextTypes = d2Context;

Access.propTypes = {
    access: PropTypes.object.isRequired,
    accessType: PropTypes.string.isRequired,
    accessOptions: PropTypes.object.isRequired,
    primaryText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    secondaryText: PropTypes.string,
    onRemove: PropTypes.func,
};

Access.defaultProps = {
    secondaryText: undefined,
    onRemove: undefined,
    disabled: false,
};

export const GroupAccess = compose(
    mapProps(useAccessObjectFormat),
    withProps(props => ({
        accessType: props.groupType,
        primaryText: props.groupName,
        accessOptions: {
            meta: { canView: true, canEdit: true, noAccess: false },
            data: props.dataShareable && {
                canView: true,
                canEdit: true,
                noAccess: true,
            },
        },
    }))
)(Access);

export const ExternalAccess = compose(
    getContext(d2Context),
    withProps((props) => {
        props.d2.i18n.addStrings([
            'public_access',
            'external_access',
            'anyone_can_view_without_a_login',
            'anyone_can_find_view_and_edit',
            'anyone_can_find_and_view',
            'no_access']);

        return {
            accessType: 'external',
            primaryText: props.d2.i18n.getTranslation('external_access'),
            secondaryText: props.access
                ? props.d2.i18n.getTranslation('anyone_can_view_without_a_login')
                : props.d2.i18n.getTranslation('no_access'),
            access: {
                meta: { canEdit: false, canView: props.access },
                data: { canEdit: false, canView: false },
            },
            onChange: newAccess => props.onChange(newAccess.meta.canView),
            accessOptions: {
                meta: { canView: true, canEdit: false, noAccess: true },
            },
        }
    })
)(Access);

const constructSecondaryText = ({ canView, canEdit }) => {
    if (canEdit) {
        return 'anyone_can_find_view_and_edit';
    }

    return canView ? 'anyone_can_find_and_view' : 'no_access';
};

export const PublicAccess = compose(
    mapProps(useAccessObjectFormat),
    getContext(d2Context),
    withProps((props) => {
        props.d2.i18n.addStrings([
            'public_access',
            'external_access',
            'anyone_can_view_without_a_login',
            'anyone_can_find_view_and_edit',
            'anyone_can_find_and_view',
            'no_access']);
        return {
            accessType: 'public',
            primaryText: props.d2.i18n.getTranslation('public_access'),
            secondaryText: props.d2.i18n.getTranslation(
                constructSecondaryText(props.access.meta)
            ),
            accessOptions: {
                meta: { canView: true, canEdit: true, noAccess: true },
                data: props.dataShareable && {
                    canView: true,
                    canEdit: true,
                    noAccess: true,
                },
            },
        };
    }),
)(Access);
