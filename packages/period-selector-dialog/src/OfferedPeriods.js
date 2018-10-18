import React from 'react';
import PropTypes from 'prop-types';
import RelativePeriods from './RelativePeriods';
import FixedPeriods from './FixedPeriods';
import PeriodTypes from './PeriodTypes';


export const OfferedPeriods = (props) => {
    const { periodType, ...remaindingProps } = props;

    const relativePeriods = <RelativePeriods {...remaindingProps} />;
    const fixedPeriods = <FixedPeriods {...remaindingProps} />;

    switch (periodType) {
    case PeriodTypes.FIXED:
        return fixedPeriods;
    case PeriodTypes.RELATIVE:
        return relativePeriods;
    default:
        return relativePeriods;
    }
};

OfferedPeriods.propTypes = {
    periodType: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
};

export default OfferedPeriods;
