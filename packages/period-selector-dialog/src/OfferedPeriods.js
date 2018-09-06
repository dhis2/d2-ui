import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RelativePeriods from './RelativePeriods';
import FixedPeriods from './FixedPeriods';
import PeriodTypes from './PeriodTypes';

class OfferedPeriods extends Component {
    render() {
        let PeriodOptions;

        const { periods, setOfferedPeriods, onPeriodClick } = this.props;

        const defaultOptions = (<RelativePeriods
            periods={periods}
            setOfferedPeriods={setOfferedPeriods}
            onPeriodClick={onPeriodClick}
        />);

        switch (this.props.periodType) {
        case PeriodTypes.FIXED:
            PeriodOptions = (<FixedPeriods
                periods={periods}
                setOfferedPeriods={setOfferedPeriods}
                onPeriodClick={onPeriodClick}
            />);
            break;
        case PeriodTypes.RELATIVE:
        default:
            PeriodOptions = defaultOptions;
        }

        return PeriodOptions;
    }
}

OfferedPeriods.propTypes = {
    periodType: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

export default OfferedPeriods;
