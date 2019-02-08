import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ItemSelector } from 'analytics-shared-components';

import Store from './reducers';
import PeriodTypeButton from './PeriodTypeButton';
import FixedPeriodFIlter from './FixedPeriodFilter';
import RelativePeriodFilter from './RelativePeriodFilter';
import { FIXED, RELATIVE } from './utils/periodTypes';
// eslint-disable-next-line import/no-unresolved
import './PeriodSelector.css';

import {
    setPeriodType,
    setOfferedPeriods,
    addSelectedPeriods,
    setSelectedPeriods,
} from './actions';

class Periods extends Component {
    constructor(props) {
        super(props);

        this.props.setSelectedPeriods(this.props.selectedItems);
        this.state = { offeredPeriodsInOrder: [] };
    }

    onPeriodTypeClick = (periodType) => {
        if (this.props.periodType !== periodType) {
            this.props.setPeriodType(periodType);
        }
    };

    onSelectPeriods = (periodIds) => {
        const offeredPeriods = this.props.offeredPeriods.filter(period => !periodIds.includes(period.id));
        const periodsToAdd = this.props.offeredPeriods.filter(period => periodIds.includes(period.id));

        this.props.setOfferedPeriods(offeredPeriods);
        this.props.onSelect(periodsToAdd);
        this.props.addSelectedPeriods(periodsToAdd);
    };

    setSelectedPeriodOrder = (periodIds) => {
        const selectedPeriods = periodIds.map(id => this.props.selectedPeriods.find(period => period.id === id));

        this.props.onReorder(selectedPeriods);
        this.props.setSelectedPeriods(selectedPeriods);
    }

    onDeselectPeriods = periodIds => {
        const selectedPeriods = this.props.selectedPeriods.filter(period => !periodIds.includes(period.id));
        const removedPeriods =  this.props.selectedPeriods.filter(period => periodIds.includes(period.id));
        const offeredPeriods = this.state.offeredPeriodsInOrder.filter(period => !selectedPeriods.map(p => p.id).includes(period.id));

        this.props.onDeselect(removedPeriods);
        this.props.setSelectedPeriods(selectedPeriods);
        this.props.setOfferedPeriods(offeredPeriods);
    };

    initializeOfferedPeriods = (periods, initial = false) => {
        const selectedPeriods = initial ? this.props.selectedItems : this.props.selectedPeriods;
        const offeredPeriods = periods.filter(period => !selectedPeriods.map(p => p.id).includes(period.id));

        this.setState({ offeredPeriodsInOrder: periods });
        this.props.setOfferedPeriods(offeredPeriods);
    }

    setOfferedPeriods = periods => {
        const selectedIds = this.props.selectedItems.map(item => item.id);
        const offeredPeriods = periods.filter(period => !selectedIds.includes(period.id));

        this.props.setOfferedPeriods(offeredPeriods);
    };

    renderPeriodTypeButtons = () => (
        <div>
            <PeriodTypeButton
                periodType={RELATIVE}
                activePeriodType={this.props.periodType}
                text={'Relative periods'}
                onClick={this.onPeriodTypeClick}
            />
            <PeriodTypeButton
                periodType={FIXED}
                activePeriodType={this.props.periodType}
                text={'Fixed periods'}
                onClick={this.onPeriodTypeClick}
            />
        </div>
    );

    render = () => {
        const filterZone = () => {
            if (this.props.periodType === FIXED) {
                return (<FixedPeriodFIlter setOfferedPeriods={this.initializeOfferedPeriods} />);
            }

            return (<RelativePeriodFilter  setOfferedPeriods={this.initializeOfferedPeriods} />);
        }

        const unselected = {
            items: this.props.offeredPeriods,
            onSelect: this.onSelectPeriods,
            filterText: ''
        };

        const selected = {
            items: this.props.selectedPeriods,
            onDeselect: this.onDeselectPeriods,
            onReorder: this.setSelectedPeriodOrder,
        };
        return (
            <Fragment>
                {this.renderPeriodTypeButtons()}
                <div style={{display: 'flex', marginTop: '18px'}}>
                    <ItemSelector
                            itemClassName="period-selector"
                            unselected={unselected}
                            selected={selected}
                        >
                            {filterZone()}
                    </ItemSelector>
                </div>
            </Fragment>
        );
    };
}

Periods.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    periodType: PropTypes.string.isRequired,
    offeredPeriods: PropTypes.array.isRequired,
    selectedPeriods: PropTypes.array.isRequired,
    setPeriodType: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    addSelectedPeriods: PropTypes.func.isRequired,
    setSelectedPeriods: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    periodType: state.periodType,
    offeredPeriods: state.offeredPeriods.periods,
    selectedPeriods: state.selectedPeriods.periods,
});

const mapDispatchToProps = {
    setPeriodType,
    setOfferedPeriods,
    addSelectedPeriods,
    setSelectedPeriods,
};

const ConnectedPeriodSelector = connect(mapStateToProps, mapDispatchToProps)(Periods);

const PeriodSelector = props => (
    <Provider store={Store}>
        <ConnectedPeriodSelector {...props} />
    </Provider>
);

PeriodSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),
};

PeriodSelector.defaultProps = {
    selectedItems: [],
};

export default PeriodSelector;
