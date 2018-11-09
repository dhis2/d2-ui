import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Periods from './Periods';
import Store from './reducers';

const PeriodSelector = props => (
    <Provider store={Store}>
        <Periods {...props} />
    </Provider>
);

PeriodSelector.propTypes = {
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    selectedItems: PropTypes.array,
};

PeriodSelector.defaultProps = {
    onSelect: () => null,
    onDeselect: () => null,
    selectedItems: [],
};

export default PeriodSelector;
