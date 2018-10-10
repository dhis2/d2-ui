import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Periods from './Periods';
import Store from './reducers';

class PeriodSelector extends Component {
    getChildContext() {
        return {
            listHeight: this.props.listHeight,
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
    periods: PropTypes.array,
    onPeriodsSelect: PropTypes.func.isRequired,
    listHeight: PropTypes.number,
};

PeriodSelector.defaultProps = {
    periods: [],
    listHeight: 320,
};

PeriodSelector.childContextTypes = {
    d2: PropTypes.object,
    listHeight: PropTypes.number,
};

export default PeriodSelector;
