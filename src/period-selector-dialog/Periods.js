import React, { Component } from 'react';
import { Button } from 'material-ui-next';
import { connect } from 'react-redux';
import OfferedPeriods from './OfferedPeriods';
import SelectedPeriods from './SelectedPeriods';
import './PeriodSelector.css';

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
    constructor(props) {
        super(props);
    };

    componentWillUpdate(nextProps) {
        // based on periods array length fire on periods select event
        if (nextProps.selectedPeriods.length !== this.props.selectedPeriods.length) {
            this.props.onPeriodsSelect(nextProps.selectedPeriods);
        }
    };

    onPeriodTypeClick = (periodType) => {
        if (this.props.periodType !== periodType) {
            this.props.setPeriodType(periodType);
            this.props.setOfferedPeriods([]);
        }
    };

    onSelectPeriods = () => {
        const { removeOfferedPeriods, addSelectedPeriods, offeredPeriods } = this.props;
        const selectedOfferedPeriods = offeredPeriods.periods.filter(period => period.selected === true);

        addSelectedPeriods(selectedOfferedPeriods);
        removeOfferedPeriods(selectedOfferedPeriods);
    };

    onUnselectPeriods = () => {
        const { addOfferedPeriods, selectedPeriods, removeSelectedPeriods } = this.props;
        const periods = selectedPeriods.filter(period => period.selected === true);

        removeSelectedPeriods(periods);
        addOfferedPeriods(periods);
    };

    renderPeriodTypeButtons = () => {
        return <div>
            <Button className={'nav-button ' + (this.props.periodType === 'RELATIVE' ? 'active' : '')}
                    onClick={() => this.onPeriodTypeClick('RELATIVE')}
            >
                Relative periods
            </Button>
            <Button className={'nav-button ' + (this.props.periodType === 'FIXED' ? 'active' : '')}
                    onClick={() => this.onPeriodTypeClick('FIXED')}
            >
                Fixed periods
            </Button>
        </div>;
    };

    renderSelectButtons = () => {
        return <div>
            <Button className="select-button"
                    onClick={this.onSelectPeriods}
            >
                <i className="material-icons">arrow_forward</i>
            </Button>
            <Button className="select-button"
                    onClick={this.onUnselectPeriods}
            >
                <i className="material-icons">arrow_back</i>
            </Button>
        </div>
    };

    render() {
        const {
            periodType,
            offeredPeriods,
            setOfferedPeriods,
            removeOfferedPeriods,
            toggleOfferedPeriod,
            selectedPeriods,
            addSelectedPeriods,
            removeSelectedPeriods,
            toggleSelectedPeriod,
        } = this.props;

        return <div className="periods-component">
            {this.renderPeriodTypeButtons()}
            <div>
                <div className="block options">
                    <OfferedPeriods periodType={periodType}
                                    periods={offeredPeriods.periods}
                                    setOfferedPeriods={setOfferedPeriods}
                                    removeOfferedPeriods={removeOfferedPeriods}
                                    onPeriodClick={toggleOfferedPeriod}
                    />
                </div><div className="block buttons">
                    {this.renderSelectButtons()}
                </div><div className="block selected-periods">
                    <SelectedPeriods periods={selectedPeriods}
                                     addSelectedPeriods={addSelectedPeriods}
                                     removeSelectedPeriods={removeSelectedPeriods}
                                     onPeriodClick={toggleSelectedPeriod}
                    />
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
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
