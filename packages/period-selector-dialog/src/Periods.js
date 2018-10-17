import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeriodTypeButton from './PeriodTypeButton';
import SelectedPeriods from './SelectedPeriods';
import { OfferedPeriods } from './OfferedPeriods';
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

const SelectButton = ({ action }) => (
    <Button
        className="select-button"
        onClick={action}
    >
        <ArrowForwardIcon />
    </Button>
);

const DeselectButton = ({ action }) => (
    <Button
        className="select-button"
        onClick={action}
    >
        <ArrowBackIcon />
    </Button>
);

class Periods extends Component {
    constructor(props, context) {
        super(props);

        this.i18n = context.d2.i18n;

        if (this.props.periods.length > 0) {
            this.props.setSelectedPeriods(this.props.periods);
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

        this.props.onSelect(selectedOfferedPeriods);
        this.props.addSelectedPeriods(selectedOfferedPeriods);
        this.props.removeOfferedPeriods(selectedOfferedPeriods);
    };

    onDeselectPeriods = () => {
        const periods = this.props
            .selectedPeriods
            .periods
            .filter(period => period.selected === true);

        this.props.onDeselect(periods);
        this.props.removeSelectedPeriods(periods);
        this.props.addOfferedPeriods(periods);
    };

    onDoubleClick = (period) => {
        const itemToAdd = [period];
        this.props.onSelect(itemToAdd);
        this.props.addSelectedPeriods(itemToAdd);
        this.props.removeOfferedPeriods(itemToAdd);
    }

    onRemovePeriod = (period) => {
        const itemToRemove = [period];
        this.props.onDeselect(itemToRemove);
        this.props.removeSelectedPeriods(itemToRemove);
        this.props.addOfferedPeriods(itemToRemove);
    };

    onClearAll = (periods) => {
        this.props.onDeselect(periods);
    };

    renderPeriodTypeButtons = () => (
        <Fragment>
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
        </Fragment>
    );

    renderSelectButtons = () => (
        <Fragment>
            <SelectButton action={this.onSelectPeriods} />
            <DeselectButton action={this.onDeselectPeriods} />
        </Fragment>
    );

    render = () => (
        <div>
            {this.renderPeriodTypeButtons()}
            <div className="periods-container">
                <div className="block options">
                    <OfferedPeriods
                        periodType={this.props.periodType}
                        periods={this.props.offeredPeriods.periods}
                        setOfferedPeriods={this.props.setOfferedPeriods}
                        onDoubleClick={this.onDoubleClick}
                        onPeriodClick={this.props.toggleOfferedPeriod}
                    />
                </div>
                <div className="block buttons">
                    {this.renderSelectButtons()}
                </div>
                <div className="block selected-periods">
                    <SelectedPeriods
                        periods={this.props.selectedPeriods.periods}
                        onClearAll={this.onClearAll}
                        onPeriodClick={this.props.toggleSelectedPeriod}
                        onRemovePeriodClick={this.onRemovePeriod}
                        setSelectedPeriods={this.props.setSelectedPeriods}
                        addOfferedPeriods={this.props.addOfferedPeriods}
                    />
                </div>
            </div>
        </div>
    )
}

Periods.propTypes = {
    periods: PropTypes.array.isRequired,
    periodType: PropTypes.string.isRequired,
    offeredPeriods: PropTypes.object.isRequired,
    selectedPeriods: PropTypes.object.isRequired,
    setPeriodType: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    setSelectedPeriods: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
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
