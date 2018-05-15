import React, { Component } from 'react';
import RelativePeriods from './RelativePeriods';
import FixedPeriods from './FixedPeriods';

class OfferedPeriods extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let PeriodOptions;

        const { periods, addOfferedPeriods, onPeriodClick } = this.props;

        switch(this.props.periodType) {
            case 'RELATIVE':
                PeriodOptions = <RelativePeriods periods={periods}
                                                 addOfferedPeriods={addOfferedPeriods}
                                                 onPeriodClick={onPeriodClick}
                />;
                break;
            case 'FIXED':
                PeriodOptions = <FixedPeriods periods={periods}
                                              addOfferedPeriods={addOfferedPeriods}
                                              onPeriodClick={onPeriodClick}
                />;
                break;
        }

        return PeriodOptions;
    }
}

export default OfferedPeriods;
