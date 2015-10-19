import {PropTypes, createClass, default as React} from 'react';
import Heading from '../headings/Heading.component';
import CreatedBy from './CreatedBy.component';
import ExternalAccess from './ExternalAccess.component';
import PublicAccess from './PublicAccess.component';
import sharingActions from './sharing.actions';
import sharingStore from './sharing.store';
import UserGroupAccesses from './UserGroupAccesses.component';
import LoadingMask from '../loading-mask/LoadingMask.component';
import AutoComplete from '../auto-complete/AutoComplete.component';

export default createClass({
    propTypes: {
        objectToShare: PropTypes.shape({
            name: PropTypes.string.isRequired,
            user: PropTypes.object.isRequired,
        }).isRequired,
    },

    getInitialState() {
        return {
            objectToShare: null,
        };
    },

    componentWillMount() {
        sharingActions.loadObjectSharingState(this.props.objectToShare);

        this.disposable = sharingStore
            .subscribe((newState) => {
                this.setState({
                    objectToShare: newState,
                });
            });
    },

    componentWillUnmount() {
        this.disposable.dispose();
    },

    render() {
        const loadingMaskStyle = {
            position: 'relative',
        };

        const {
            objectToShare,
            ...other,
        } = this.props;

        if (!this.state.objectToShare) {
            return (
                <LoadingMask style={loadingMaskStyle} size={1} />
            );
        }

        return (
            <div>
                <Heading text={objectToShare.name} level={2} />
                <CreatedBy user={objectToShare.user} />
                <div>
                    <AutoComplete forType="userGroup" />
                </div>
                <ExternalAccess externalAccess={this.state.objectToShare.externalAccess} onChange={this.updatedExternalAccess} />
                <PublicAccess publicAccess={this.state.objectToShare.publicAccess} onChange={this.updatePublicAccess} />
                <UserGroupAccesses userGroupAccesses={this.state.objectToShare.userGroupAccesses} onChange={this.updateUserGroupAccesses} />
            </div>
        );
    },

    updatedExternalAccess(externalAccessValue) {
        sharingActions.externalAccessChanged(externalAccessValue);
    },

    updatePublicAccess(publicAccessValue) {
        sharingActions.publicAccessChanged(publicAccessValue);
    },

    updateUserGroupAccesses(userGroupAccesses) {
        sharingActions.userGroupAcessesChanged(userGroupAccesses);
    },
});
