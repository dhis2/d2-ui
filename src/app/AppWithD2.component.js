import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';

class DataTableHeader extends Component {
    state = {};

    componentDidMount() {
        if (!this.props.d2) {
            return log.error('D2 is a required prop to <AppWithD2 />');
        }
        this.props.d2
            .then(d2 => this.setState({ d2 }))
            .catch(error => log.error(error));
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

DataTableHeader.propTypes = {
    children: PropTypes.element,
    d2: PropTypes.shape({
        then: PropTypes.func.isRequired,
    }),
};

DataTableHeader.childContextTypes = {
    d2: PropTypes.object,
};

DataTableHeader.childContext = {
    d2: this.state.d2,
};

export default DataTableHeader;
