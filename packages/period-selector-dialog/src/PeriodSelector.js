import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Periods from './Periods';
import Store from './reducers';

class PeriodSelector extends Component {
    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    render() {
        return (
            <Provider store={Store}>
                <Periods {...this.props} />
            </Provider>
        );
    }
}

PeriodSelector.propTypes = {
    d2: PropTypes.object.isRequired,
    onPeriodsSelect: PropTypes.func.isRequired,
};

PeriodSelector.childContextTypes = {
    d2: PropTypes.object,
};

export default PeriodSelector;
