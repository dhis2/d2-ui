import {PropTypes, createClass, default as React} from 'react';
import Heading from '../headings/Heading.component';
import CreatedBy from './CreatedBy.component';
import ExternalAccess from './ExternalAccess.component';
import PublicAccess from './PublicAccess.component';
import sharingActions from './sharing.actions';
import sharingStore from './sharing.store';

export default createClass({
    propTypes: {
        objectToShare: PropTypes.shape({
            name: PropTypes.string.isRequired,
            user: PropTypes.object.isRequired,
        }).isRequired,
    },

    getInitialState() {
        return {
            objectToShare: this.props.objectToShare,
        };
    },

    componentWillMount() {
        sharingActions.loadObjectSharingState(this.props.objectToShare);

        this.disposable = sharingStore
            .subscribe((newState) => {
                this.setState({
                    objectToShare: Object.assign(this.state.objectToShare, newState),
                });
            });
    },

    componentWillUnmount() {
        this.disposable.dispose();
    },

    render() {
        const {
            objectToShare,
            ...other,
        } = this.props;

        return (
            <div>
                <Heading text={objectToShare.name} level={2} />
                <CreatedBy user={objectToShare.user} />
                <ExternalAccess externalAccess={this.state.objectToShare.externalAccess} onChange={this.updatedExternalAccess} />
                <PublicAccess publicAccess={objectToShare.publicAccess} onChange={this.updatePublicAccess} />
            </div>
        );
    },

    updatedExternalAccess(externalAccessValue) {
        sharingActions.externalAccessChanged(externalAccessValue);
    },

    updatePublicAccess(publicAccessValue) {
        sharingActions.publicAccessChanged(publicAccessValue);
    },
});
