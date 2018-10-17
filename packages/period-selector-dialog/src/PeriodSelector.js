import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Periods from './Periods';
import Store from './reducers';

class PeriodSelector extends Component {
    getChildContext = () => ({
        d2: this.props.d2,
    })

    render = () => (
        <Provider store={Store}>
            <Periods {...this.props} />
        </Provider>
    )
}

PeriodSelector.propTypes = {
    d2: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    periods: PropTypes.array,
};

PeriodSelector.defaultProps = {
    periods: [],
    onSelect: () => null,
    onDeselect: () => null,
};

PeriodSelector.childContextTypes = {
    d2: PropTypes.object,
};

export default PeriodSelector;
