import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';

class AppWithD2 extends Component {
    state = {};

    getChildContext = () => {
        return {
            d2: this.state.d2,
        };
    };

    componentDidMount() {
        if (!this.props.d2) {
            log.error('D2 is a required prop to <AppWithD2 />');
        } else {
            this.props.d2
                .then(d2 => this.setState({ d2 }))
                .catch(error => log.error(error));
        }
    }

    render() {
        const getChildren = () => {
            if (!this.props.children) { return null; }
            return React.Children.map(this.props.children, child => React.cloneElement(child));
        };

        return (
            <div>
                {getChildren()}
            </div>
        );
    }
}

AppWithD2.propTypes = {
    children: PropTypes.element,
    d2: PropTypes.shape({
        then: PropTypes.func.isRequired,
    }),
};

AppWithD2.childContextTypes = {
    d2: PropTypes.object,
};

export default AppWithD2;
