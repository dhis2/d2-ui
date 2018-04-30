import React, { Component } from 'react';
import { Button } from 'material-ui-next';
import { connect } from 'react-redux';
import { setPeriodType, addSelectedPeriod, removeSelectedPeriod } from "./actions";
import RelativePeriods from './RelativePeriods';
import FixedPeriods from './FixedPeriods';
import './PeriodSelector.css';

class Periods extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        let PeriodOptions;

        switch(this.props.periodType) {
            case 'RELATIVE':
                PeriodOptions = <RelativePeriods/>;
                break;
            case 'FIXED':
                PeriodOptions = <FixedPeriods/>;
                break;
        }

        return <div className="periods-component">
            <Button className={'nav-button ' + (this.props.periodType === 'RELATIVE' ? 'active' : '')}
                    onClick={() => this.props.setPeriodType('RELATIVE')}
            >
                Relative periods
            </Button>
            <Button className={'nav-button ' + (this.props.periodType === 'FIXED' ? 'active' : '')}
                    onClick={() => this.props.setPeriodType('FIXED')}
            >
                Fixed periods
            </Button>
            <Button className={'nav-button ' + (this.props.periodType === 'RANGE' ? 'active' : '')}
                    onClick={() => this.props.setPeriodType('RANGE')}
            >
                Date range
            </Button>
            <div>
                <div className="block options">
                    {PeriodOptions}
                </div>
                <div className="block buttons">
                </div>
                <div className="block selected-periods">
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    periodType: state.periodType,
    selectedPeriods: state.selectedPeriods,
});

const mapDispatchToProps = {
    setPeriodType,
    addSelectedPeriod,
    removeSelectedPeriod
};

export default connect(mapStateToProps, mapDispatchToProps)(Periods);
