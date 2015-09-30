import React from 'react';
import log from 'loglevel';

export default React.createClass({
    propTypes: {
        children: React.PropTypes.element,
        d2: React.PropTypes.shape({
            then: React.PropTypes.func.isRequired,
        }),
    },

    childContextTypes: {
        d2: React.PropTypes.object,
    },

    getChildContext() {
        return {
            d2: this.state.d2,
        };
    },

    getInitialState() {
        return {};
    },

    componentDidMount() {
        if (!this.props.d2) {
            return log.error('D2 is a required prop to <AppWithD2 />');
        }
        this.props.d2.then(d2 => this.setState({d2}));
    },

    render() {
        const getChildren = () => {
            if (!this.props.children) { return null; }
            return React.Children.map(this.props.children, child => {
                return React.addons.cloneWithProps(child);
            });
        };

        return (
            <div>
                {getChildren()}
            </div>
        );
    },
});
