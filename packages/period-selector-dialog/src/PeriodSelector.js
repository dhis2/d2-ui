import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ItemSelector from './ItemSelector/ItemSelector';

import PeriodTypeButton from './PeriodTypeButton';
import FixedPeriodFilter from './FixedPeriodFilter';
import RelativePeriodFilter from './RelativePeriodFilter';
import { FIXED, RELATIVE } from './modules/periodTypes';

// eslint-disable-next-line import/no-unresolved
import './PeriodSelector.css';

class PeriodSelector extends Component {
    state = {
        offeredPeriods: [],
        offeredPeriodsInOrder: [],
        selectedPeriods: [],
        periodType: RELATIVE
    };

    constructor(props) {
        super(props);

        this.state.selectedPeriods = this.props.selectedItems;
    }

    onPeriodTypeClick = (periodType) => {
        if (this.state.periodType !== periodType) {
            this.setState({ periodType });
        }
    };

    onSelectPeriods = (periodIds) => {
        const offeredPeriods = this.state.offeredPeriods.filter(period => !periodIds.includes(period.id));
        const newPeriods = this.state.offeredPeriods.filter(period => periodIds.includes(period.id));
        const selectedPeriods = this.state.selectedPeriods.concat(newPeriods);

        this.setState({ selectedPeriods, offeredPeriods });
        this.props.onSelect(selectedPeriods);
    };

    setSelectedPeriodOrder = (periodIds) => {
        const selectedPeriods = periodIds.map(id => this.state.selectedPeriods.find(period => period.id === id));

        this.setState({ selectedPeriods });
        this.props.onReorder(selectedPeriods);
    }

    onDeselectPeriods = periodIds => {
        const selectedPeriods = this.state.selectedPeriods.filter(period => !periodIds.includes(period.id));
        const removedPeriods =  this.state.selectedPeriods.filter(period => periodIds.includes(period.id));
        const offeredPeriods = this.state.offeredPeriodsInOrder.filter(period => !selectedPeriods.map(p => p.id).includes(period.id));

        this.setState({ selectedPeriods, offeredPeriods });
        this.props.onDeselect(removedPeriods);
    };

    initializeOfferedPeriods = (periods, initial = false) => {
        const selectedPeriods = initial ? this.props.selectedItems : this.state.selectedPeriods;
        const offeredPeriods = periods.filter(period => !selectedPeriods.map(p => p.id).includes(period.id));

        this.setState({ offeredPeriodsInOrder: periods, offeredPeriods });
    }

    renderPeriodTypeButtons = () => (
        <div>
            <PeriodTypeButton
                periodType={RELATIVE}
                activePeriodType={this.state.periodType}
                text={'Relative periods'}
                onClick={this.onPeriodTypeClick}
            />
            <PeriodTypeButton
                periodType={FIXED}
                activePeriodType={this.state.periodType}
                text={'Fixed periods'}
                onClick={this.onPeriodTypeClick}
            />
        </div>
    );

    render = () => {
        const filterZone = () => {
            if (this.state.periodType === FIXED) {
                return (<FixedPeriodFilter setOfferedPeriods={this.initializeOfferedPeriods} />);
            }

            return (<RelativePeriodFilter  setOfferedPeriods={this.initializeOfferedPeriods} />);
        }

        const unselected = {
            items: this.state.offeredPeriods,
            onSelect: this.onSelectPeriods,
            filterText: ''
        };

        const selected = {
            items: this.state.selectedPeriods,
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
