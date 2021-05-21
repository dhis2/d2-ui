import PropTypes from 'prop-types';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Heading from '@dhis2/d2-ui-core/headings/Heading.component';
import UserSearch from './UserSearch.component';
import CreatedBy from './CreatedBy.component';
import {
    PublicAccess,
    ExternalAccess,
    GroupAccess,
} from './Access.component';

const styles = {
    createdBy: {
        color: '#818181',
    },
    titleBodySpace: {
        paddingTop: 30,
    },
    rules: {
        height: '240px',
        overflowY: 'scroll',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(33, 43, 54, 0.4)',
    },

    center: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        pointerEvents: 'none',
        WebkitBoxAlign: 'center',
        alignItems: 'center',
    },

    offlineMessage: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '3px'
    },
};

/**
 * Content of the sharing dialog; a set of components for changing sharing
 * preferences.
 */
class Sharing extends React.Component {
    constructor(props, context) {
        super(props);
        context.d2.i18n.addStrings(['who_has_access']);
    }

    onAccessRuleChange = id => (accessRule) => {
        const changeWithId = rule => (rule.id === id ? { ...rule, access: accessRule } : rule);
        const userAccesses = (this.props.sharedObject.object.userAccesses || []).map(changeWithId);
        const userGroupAccesses = (this.props.sharedObject.object.userGroupAccesses || []).map(changeWithId);

        this.props.onChange({
            userAccesses,
            userGroupAccesses,
        });
    }

    onAccessRemove = accessOwnerId => () => {
        const withoutId = accessOwner => accessOwner.id !== accessOwnerId;
        const userAccesses = (this.props.sharedObject.object.userAccesses || []).filter(withoutId);
        const userGroupAccesses = (this.props.sharedObject.object.userGroupAccesses || []).filter(withoutId);

        this.props.onChange({
            userAccesses,
            userGroupAccesses,
        });
    }

    onPublicAccessChange = (publicAccess) => {
        this.props.onChange({
            publicAccess,
        });
    }

    onExternalAccessChange = (externalAccess) => {
        this.props.onChange({
            externalAccess,
        });
    }

    setAccessListRef = (ref) => {
        this.accessListRef = ref;
    }

    accessListRef = null;

    addUserAccess = (userAccess) => {
        const currentAccesses = this.props.sharedObject.object.userAccesses || [];
        this.props.onChange({
            userAccesses: [...currentAccesses, userAccess],
        }, this.scrollAccessListToBottom());
    }

    addUserGroupAccess = (userGroupAccess) => {
        const currentAccesses = this.props.sharedObject.object.userGroupAccesses || [];
        this.props.onChange({
            userGroupAccesses: [...currentAccesses, userGroupAccess],
        }, this.scrollAccessListToBottom());
    }

    scrollAccessListToBottom = () => {
        this.accessListRef.scrollTop = this.accessListRef.scrollHeight;
    }

    render() {
        const {
            user,
            displayName,
            userAccesses,
            userGroupAccesses,
            publicAccess,
            externalAccess,
        } = this.props.sharedObject.object;
        const {
            allowPublicAccess,
            allowExternalAccess,
        } = this.props.sharedObject.meta;

        const accessIds = (userAccesses || []).map(access => access.id)
            .concat((userGroupAccesses || []).map(access => access.id));

        return (
            <div style={{position: 'relative'}}>
                {this.props.isOffline && (
                    <div style={styles.overlay} >
                        <div style={styles.center}>
                            <span style={styles.offlineMessage}>{this.props.offlineMessage}</span>
                        </div>
                    </div>
                )}
                <Heading text={displayName} level={2} />
                <CreatedBy author={user} />
                <div style={styles.titleBodySpace} />
                <Typography variant="subtitle1">{this.context.d2.i18n.getTranslation('who_has_access')}</Typography>
                <Divider />
                <div style={styles.rules} ref={this.setAccessListRef}>
                    <PublicAccess
                        access={publicAccess}
                        disabled={!allowPublicAccess}
                        dataShareable={this.props.dataShareable}
                        onChange={this.onPublicAccessChange}
                    />
                    <Divider />
                    <ExternalAccess
                        access={externalAccess}
                        disabled={!allowExternalAccess}
                        onChange={this.onExternalAccessChange}
                    />
                    <Divider />
                    { userAccesses && userAccesses.map(access => (
                        <div key={access.id}>
                            <GroupAccess
                                groupName={access.displayName}
                                groupType="user"
                                access={access.access}
                                dataShareable={this.props.dataShareable}
                                onRemove={this.onAccessRemove(access.id)}
                                onChange={this.onAccessRuleChange(access.id)}
                            />
                            <Divider />
                        </div>
                    ))}
                    { userGroupAccesses && userGroupAccesses.map(access => (
                        <div key={access.id}>
                            <GroupAccess
                                access={access.access}
                                groupName={access.displayName}
                                groupType="userGroup"
                                dataShareable={this.props.dataShareable}
                                onRemove={this.onAccessRemove(access.id)}
                                onChange={this.onAccessRuleChange(access.id)}
                            />
                            <Divider />
                        </div>
                    ))}
                </div>
                <UserSearch
                    onSearch={this.props.onSearch}
                    addUserAccess={this.addUserAccess}
                    addUserGroupAccess={this.addUserGroupAccess}
                    dataShareable={this.props.dataShareable}
                    currentAccessIds={accessIds}
                />
            </div>
        );
    }
}

Sharing.propTypes = {
    /**
     * The object to share
     */
    sharedObject: PropTypes.object.isRequired,

    /*
     * If true, the object's data should have their own settings.
     */
    dataShareable: PropTypes.bool.isRequired,

    /**
     * Function that takes an object containing updated sharing preferences and
     * an optional callback fired when the change was successfully posted.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Takes a string and a callback, and returns matching users and userGroups.
     */
    onSearch: PropTypes.func.isRequired,

    /**
     * isOffline - indicates whether there is internet connectivity
     */
    isOffline: PropTypes.bool,

    /**
     * offlineMessage - message to display in overlay when no internet connectivity
     */
    offlineMessage: PropTypes.string,
};

Sharing.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default Sharing;
