import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        size: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            style: {},
            size: 1.5,
        };
    },

    render() {
        const loadingStatusMask = {
            left: '45%',
            position: 'fixed',
            top: '45%',
        };

        return (
            <CircularProgress
                mode="indeterminate"
                size={this.props.size}
                style={Object.assign(loadingStatusMask, this.props.style)}
            />
        );
    },
});
