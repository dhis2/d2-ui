import React, { Component } from 'react';
import { Button } from 'material-ui-next';
import { connect } from 'react-redux';
import { setPeriodType, addSelectedPeriod, removeSelectedPeriod } from "./actions";
import SelectedPeriods from "./SelectedPeriods";

import './PeriodSelector.css';

class Periods extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
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
            <SelectedPeriods
                periods={this.props.selectedPeriods}
                removePeriod={this.props.removeSelectedPeriod}
            />
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
