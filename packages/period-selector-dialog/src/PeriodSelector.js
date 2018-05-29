import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Periods from './Periods';
import PropTypes from 'prop-types';
import Store from './reducers';

class PeriodSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={Store}>
                <Periods { ...this.props } />
            </Provider>
        );
    }
}

PeriodSelector.propTypes = {
    onPeriodsSelect: PropTypes.func.isRequired,
};

export default PeriodSelector;
