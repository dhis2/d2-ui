import {createClass, default as React} from 'react';
import SharingDialog from '../src/sharing/SharingDialog.component';

export default createClass({
    contextTypes: {
        d2: React.PropTypes.object,
    },

    getInitialState() {
        return {
            objectToShare: null,
        };
    },

    componentWillMount() {
        this.context.d2.models.userRole.get('Ql6Gew7eaX6')
            .then(objectToShare => this.setState({objectToShare}));
    },

    render() {
        if (!this.state.objectToShare) {
            return null;
        }

        return (
            <SharingDialog
                openImmediately
                objectToShare={this.state.objectToShare}
                />
        );
    },
});
