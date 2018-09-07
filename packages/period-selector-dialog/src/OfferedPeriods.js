import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RelativePeriods from './RelativePeriods';
import FixedPeriods from './FixedPeriods';
import PeriodTypes from './PeriodTypes';

class OfferedPeriods extends Component {
    render() {
        let PeriodOptions;

        const { periods, setOfferedPeriods, onPeriodClick } = this.props;

        const relativePeriods = (<RelativePeriods
            periods={periods}
            setOfferedPeriods={setOfferedPeriods}
            onPeriodClick={onPeriodClick}
        />);

        const fixedPeriods = (<FixedPeriods
            periods={periods}
            setOfferedPeriods={setOfferedPeriods}
            onPeriodClick={onPeriodClick}
        />);

        switch (this.props.periodType) {
        case PeriodTypes.FIXED:
            PeriodOptions = fixedPeriods;
            break;
        case PeriodTypes.RELATIVE:
            PeriodOptions = relativePeriods;
            break;
        default:
            PeriodOptions = relativePeriods;
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
