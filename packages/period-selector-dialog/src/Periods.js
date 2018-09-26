import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeriodTypeButton from './PeriodTypeButton';
import SelectedPeriods from './SelectedPeriods';
import OfferedPeriods from './OfferedPeriods';
import PeriodTypes from './PeriodTypes';
import '../css/PeriodSelector.css';

import {
    setPeriodType,
    addOfferedPeriods,
    setOfferedPeriods,
    setSelectedPeriods,
    removeOfferedPeriods,
    toggleOfferedPeriod,
    addSelectedPeriods,
    removeSelectedPeriods,
    toggleSelectedPeriod,
} from './actions';

class Periods extends Component {
    constructor(props, context) {
        super(props);

        this.i18n = context.d2.i18n;

        if (this.props.periods.length > 0) {
            this.props.setSelectedPeriods(this.props.periods);
        }
    }

    componentWillUpdate(nextProps) {
        // based on periods array length fire on periods select event
        if (nextProps.selectedPeriods.periods.length !== this.props.selectedPeriods.periods.length) {
            this.props.onPeriodsSelect(nextProps.selectedPeriods.periods);
        }
    }

    onPeriodTypeClick = (periodType) => {
        if (this.props.periodType !== periodType) {
            this.props.setPeriodType(periodType);
            this.props.setOfferedPeriods([]);
        }
    };

    onSelectPeriods = () => {
        const selectedOfferedPeriods = this.props
            .offeredPeriods
            .periods
            .filter(period => period.selected === true);

        this.props.addSelectedPeriods(selectedOfferedPeriods);
        this.props.removeOfferedPeriods(selectedOfferedPeriods);
    };

    onUnselectPeriods = () => {
        const periods = this.props
            .selectedPeriods
            .periods
            .filter(period => period.selected === true);

        this.props.removeSelectedPeriods(periods);
        this.props.addOfferedPeriods(periods);
    };

    renderPeriodTypeButtons = () => (<Fragment>
        <PeriodTypeButton
            periodType={PeriodTypes.RELATIVE}
            activePeriodType={this.props.periodType}
            text={'Relative periods'}
            onClick={this.onPeriodTypeClick}
        />
        <PeriodTypeButton
            periodType={PeriodTypes.FIXED}
            activePeriodType={this.props.periodType}
            text={'Fixed periods'}
            onClick={this.onPeriodTypeClick}
        />
    </Fragment>);

    renderSelectButtons = () => (<Fragment>
        <Button
            className="select-button"
            onClick={this.onSelectPeriods}
        >
            <ArrowForwardIcon />
        </Button>
        <Button
            className="select-button"
            onClick={this.onUnselectPeriods}
        >
            <ArrowBackIcon />
        </Button>
    </Fragment>);

    render() {
        return (<div className="periods-component">
            {this.renderPeriodTypeButtons()}
            <div>
                <div className="block options">
                    <OfferedPeriods
                        periodType={this.props.periodType}
                        periods={this.props.offeredPeriods.periods}
                        setOfferedPeriods={this.props.setOfferedPeriods}
                        onPeriodClick={this.props.toggleOfferedPeriod}
                    />
                </div><div className="block buttons">
                    {this.renderSelectButtons()}
                </div><div className="block selected-periods">
                    <SelectedPeriods
                        periods={this.props.selectedPeriods.periods}
                        onPeriodClick={this.props.toggleSelectedPeriod}
                        setSelectedPeriods={this.props.setSelectedPeriods}
                        addOfferedPeriods={this.props.addOfferedPeriods}
                    />
                </div>
            </div>
        </div>);
    }
}

Periods.propTypes = {
    periods: PropTypes.array.isRequired,
    periodType: PropTypes.string.isRequired,
    offeredPeriods: PropTypes.object.isRequired,
    selectedPeriods: PropTypes.object.isRequired,
    setPeriodType: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    setSelectedPeriods: PropTypes.func.isRequired,
    onPeriodsSelect: PropTypes.func.isRequired,
    addSelectedPeriods: PropTypes.func.isRequired,
    addOfferedPeriods: PropTypes.func.isRequired,
    removeOfferedPeriods: PropTypes.func.isRequired,
    removeSelectedPeriods: PropTypes.func.isRequired,
    toggleOfferedPeriod: PropTypes.func.isRequired,
    toggleSelectedPeriod: PropTypes.func.isRequired,
};

Periods.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    periodType: state.periodType,
    offeredPeriods: state.offeredPeriods,
    selectedPeriods: state.selectedPeriods,
});

const mapDispatchToProps = {
    setPeriodType,
    addOfferedPeriods,
    setOfferedPeriods,
    setSelectedPeriods,
    removeOfferedPeriods,
    toggleOfferedPeriod,
    addSelectedPeriods,
    removeSelectedPeriods,
    toggleSelectedPeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(Periods);
