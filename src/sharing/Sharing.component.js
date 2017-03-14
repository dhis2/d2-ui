/* eslint react/jsx-no-bind: 0 */

import { PropTypes, default as React } from 'react';
import { config } from 'd2/lib/d2';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import Heading from '../headings/Heading.component';
import UserSearch from './UserSearch.component';
import CreatedBy from './CreatedBy.component';
import PublicAccess from './PublicAccess.component';
import ExternalAccess from './ExternalAccess.component';
import UserGroupAccess from './UserGroupAccess.component';

config.i18n.strings.add('who_has_access');

const styles = {
    createdBy: {
        color: '#818181',
    },
    titleBodySpace: {
        paddingTop: 50,
    },
    rules: {
        height: '200px',
        overflowY: 'scroll',
    },
};

class Sharing extends React.Component {
    constructor(props) {
        super(props);
        this.accessList = null;
    }

    publicAccessChanged(publicCanView, publicCanEdit) {
        this.props.onSharingChanged({ publicCanView, publicCanEdit });
    }

    externalAccessChanged(isSharedExternally) {
        this.props.onSharingChanged({ isSharedExternally });
    }

    accessRulesChanged(id, canView, canEdit) {
        const accesses = [...this.props.accesses].map(accessRule => (
            accessRule.id === id ? { ...accessRule, canView, canEdit } : accessRule
        ));

        this.props.onSharingChanged({ accesses });
    }

    addUserGroupAccess(userGroup) {
        const accesses = [...this.props.accesses, userGroup];
        this.props.onSharingChanged({ accesses }, () => {
            this.scrollAccessListToBottom();
        });
    }

    removeUserGroupAccess(userGroupId) {
        const accesses = [...this.props.accesses].filter(userGroup => userGroup.id !== userGroupId);
        this.props.onSharingChanged({ accesses });
    }

    scrollAccessListToBottom() {
        this.accessList.scrollTop = this.accessList.scrollHeight;
    }

    render() {
        return (
            <div>
                <Heading text={this.props.nameOfSharableItem} level={2} />
                <CreatedBy user={this.props.authorOfSharableItem} />
                <div style={styles.titleBodySpace} />
                <Subheader>{this.context.d2.i18n.getTranslation('who_has_access')}</Subheader>
                <Divider />
                <div style={styles.rules} ref={(ref) => { this.accessList = ref; }}>
                    <PublicAccess
                        canView={this.props.publicCanView}
                        canEdit={this.props.publicCanEdit}
                        disabled={!this.props.canSetPublicAccess}
                        onChange={(accessRules) => {
                            this.publicAccessChanged(accessRules.canView, accessRules.canEdit);
                        }}
                    />
                    <Divider />
                    <ExternalAccess
                        canView={this.props.isSharedExternally}
                        disabled={!this.props.canSetExternalAccess}
                        onChange={(accessRules) => {
                            this.externalAccessChanged(accessRules.canView);
                        }}
                    />
                    <Divider />
                    { this.props.accesses.map((accessRules, index) =>
                        <div key={index}>
                            <UserGroupAccess
                                nameOfGroup={accessRules.displayName}
                                groupType={accessRules.type}
                                canView={accessRules.canView}
                                canEdit={accessRules.canEdit}
                                onRemove={() => { this.removeUserGroupAccess(accessRules.id); }}
                                onChange={(newAccessRules) => {
                                    this.accessRulesChanged(accessRules.id, newAccessRules.canView,
                                                            newAccessRules.canEdit);
                                }}
                            />
                            <Divider />
                        </div>
                    )}
                </div>
                <Divider />
                <UserSearch
                    onSearch={this.props.onSearch}
                    addUserGroupAccess={this.addUserGroupAccess.bind(this)}
                    currentAccesses={this.props.accesses}
                />
            </div>
        );
    }
}

Sharing.propTypes = {
    authorOfSharableItem: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
    nameOfSharableItem: PropTypes.string.isRequired,
    canSetPublicAccess: PropTypes.bool.isRequired,
    canSetExternalAccess: PropTypes.bool.isRequired,
    publicCanView: PropTypes.bool.isRequired,
    publicCanEdit: PropTypes.bool.isRequired,
    isSharedExternally: PropTypes.bool.isRequired,
    accesses: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['user', 'userGroup']).isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        canView: PropTypes.bool.isRequired,
        canEdit: PropTypes.bool.isRequired,
    })).isRequired,
    onSharingChanged: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

Sharing.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default Sharing;
