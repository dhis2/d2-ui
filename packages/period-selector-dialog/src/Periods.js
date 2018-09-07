import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OfferedPeriods from './OfferedPeriods';
import SelectedPeriods from './SelectedPeriods';
import PeriodTypes from './PeriodTypes';
import '../css/PeriodSelector.css';

import {
    setPeriodType,
    addOfferedPeriods,
    setOfferedPeriods,
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
    }

    componentWillUpdate(nextProps) {
        // based on periods array length fire on periods select event
        if (nextProps.selectedPeriods.periods.length !== this.props.selectedPeriods.periods.length) {
            this.props.onPeriodsSelect(nextProps.selectedPeriods.periods);
        }
    }

    onPeriodTypeClick = (e) => {
        const periodType = e.target.dataset.periodtype;

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
        // const { addOfferedPeriods, selectedPeriods, removeSelectedPeriods } = this.props;
        const periods = this.props
            .selectedPeriods
            .periods
            .filter(period => period.selected === true);

        this.props.removeSelectedPeriods(periods);
        this.props.addOfferedPeriods(periods);
    };

    renderPeriodTypeButtons = () => (<Fragment>
        <Button
            className={`nav-button ${this.props.periodType === PeriodTypes.RELATIVE ? 'active' : ''}`}
            onClick={this.onPeriodTypeClick}
            data-periodtype={PeriodTypes.RELATIVE}
        >
            {this.i18n.getTranslation('Relative periods')}
        </Button>
        <Button
            className={`nav-button ${this.props.periodType === PeriodTypes.FIXED ? 'active' : ''}`}
            onClick={this.onPeriodTypeClick}
            data-periodtype={PeriodTypes.FIXED}
        >
            {this.i18n.getTranslation('Fixed periods')}
        </Button>
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
                        removeOfferedPeriods={this.props.removeOfferedPeriods}
                        onPeriodClick={this.props.toggleOfferedPeriod}
                    />
                </div><div className="block buttons">
                    {this.renderSelectButtons()}
                </div><div className="block selected-periods">
                    <SelectedPeriods
                        periods={this.props.selectedPeriods.periods}
                        addSelectedPeriods={this.props.addSelectedPeriods}
                        removeSelectedPeriods={this.props.removeSelectedPeriods}
                        onPeriodClick={this.props.toggleSelectedPeriod}
                    />
                </div>
            </div>
        </div>);
    }
}

Periods.defaultProps = {
    periodType: PeriodTypes.RELATIVE,
};

Periods.propTypes = {
    periodType: PropTypes.string,
    offeredPeriods: PropTypes.object.isRequired,
    selectedPeriods: PropTypes.object.isRequired,
    setPeriodType: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
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
    removeOfferedPeriods,
    toggleOfferedPeriod,
    addSelectedPeriods,
    removeSelectedPeriods,
    toggleSelectedPeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(Periods);
