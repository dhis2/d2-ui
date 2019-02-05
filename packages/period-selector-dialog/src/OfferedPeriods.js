import React from 'react';
import PropTypes from 'prop-types';
import RelativePeriods from './RelativePeriods';
import FixedPeriods from './FixedPeriods';
import { FIXED, RELATIVE } from './utils/periodTypes';


export const OfferedPeriods = (props) => {
    const { periodType, ...remaindingProps } = props;

    const relativePeriods = <RelativePeriods {...remaindingProps} />;
    const fixedPeriods = <FixedPeriods {...remaindingProps} />;

    switch (periodType) {
    case FIXED:
        return fixedPeriods;
    case RELATIVE:
        return relativePeriods;
    default:
        return relativePeriods;
    }
};

OfferedPeriods.propTypes = {
    periodType: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onPeriodDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
};

export default OfferedPeriods;
