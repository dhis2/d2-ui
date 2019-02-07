import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { ItemSelector } from 'analytics-shared-components';

import PeriodTypeButton from './PeriodTypeButton';
import FixedPeriodFIlter from './FixedPeriodFilter';
import RelativePeriodFilter from './RelativePeriodFilter';
import { FIXED, RELATIVE } from './utils/periodTypes';
// eslint-disable-next-line import/no-unresolved
import './PeriodSelector.css';

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
    constructor(props) {
        super(props);

        this.props.setSelectedPeriods(this.props.selectedItems);

        this.state = {
            offeredPeriodIds: [],
        };
    }

    componentDidUpdate(prevProps) {
        const prevItems = prevProps.selectedItems.map(period => period.id);
        const currentItems = this.props.selectedItems.map(period => period.id);

        if (!isEqual(prevItems, currentItems)) {
            this.props.setSelectedPeriods(this.props.selectedItems);
        }
    }

    onPeriodTypeClick = (periodType) => {
        if (this.props.periodType !== periodType) {
            this.props.setPeriodType(periodType);
        }
    };

    onSelectPeriods = () => {
        const itemsToAdd = this.props
            .offeredPeriods
            .periods
            .filter(period => period.selected === true);

        this.props.onSelect(itemsToAdd);
        this.props.addSelectedPeriods(itemsToAdd);
        this.props.removeOfferedPeriods(itemsToAdd);
    };

    onDeselectPeriods = () => {
        const removedPeriods = this.props
            .selectedPeriods
            .periods
            .filter(period => period.selected === true);

        this.props.onDeselect(removedPeriods);
        this.props.removeSelectedPeriods(removedPeriods);
        this.addOfferedPeriods(removedPeriods);
    };

    onOfferedPeriodDoubleClick = (period) => {
        const itemToAdd = [period];

        this.props.onSelect(itemToAdd);
        this.props.addSelectedPeriods(itemToAdd);
        this.props.removeOfferedPeriods(itemToAdd);
    };

    onSelectedPeriodDoubleClick = (period) => {
        const itemToAdd = [period];

        this.props.onDeselect(itemToAdd);
        this.props.removeSelectedPeriods(itemToAdd);
        this.addOfferedPeriods(itemToAdd);
    };

    onSelectedPeriodRemove = (removedPeriod) => {
        const itemToRemove = [removedPeriod];

        this.props.onDeselect(itemToRemove);
        this.props.removeSelectedPeriods(itemToRemove);
        this.addOfferedPeriods(itemToRemove);
    };

    onClearAll = (removedPeriods) => {
        this.props.onDeselect(removedPeriods);
        this.addOfferedPeriods(removedPeriods);
        this.props.setSelectedPeriods([]);
    };

    setOfferedPeriodIds = (periods) => {
        this.setState({
            offeredPeriodIds: periods.map(period => period.id),
        }, args => console.log('has been set', args));
    };

    addOfferedPeriods = (periods) => {
        this.props.addOfferedPeriods(periods.filter(period => this.state.offeredPeriodIds.includes(period.id)));
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
        const PeriodTypeButtons = this.renderPeriodTypeButtons();

        // const sopi = args => console.log('sopi', args);
        // const sop = args => console.log('sop', args);


        const filterZone = () => {
            if (this.props.periodType === FIXED) {
                return (<FixedPeriodFIlter setOfferedPeriodIds={this.setOfferedPeriodIds} />);
            }

            return (<RelativePeriodFilter  setOfferedPeriodIds={this.setOfferedPeriodIds} />);
        }


        const unselected = {
            items: this.props.offeredPeriods.periods,
            onSelect: args => console.log('select the unselected', args),
            filterText: ''
        };

        const selected = {
            items: this.props.selectedPeriods.periods,
            onDeselect: args => console.log('unselect these', args),
            onReorder: this.props.onReorder,
        };
        return (
            <Fragment>
                {PeriodTypeButtons}
                <div style={{display: 'flex', marginTop: '18px'}}>
                    <ItemSelector
                            itemClassName="data-dimension"
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
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
    periodType: PropTypes.string.isRequired,
    offeredPeriods: PropTypes.object.isRequired,
    selectedPeriods: PropTypes.object.isRequired,
    setPeriodType: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    setSelectedPeriods: PropTypes.func.isRequired,
    addSelectedPeriods: PropTypes.func.isRequired,
    addOfferedPeriods: PropTypes.func.isRequired,
    removeOfferedPeriods: PropTypes.func.isRequired,
    removeSelectedPeriods: PropTypes.func.isRequired,
    toggleOfferedPeriod: PropTypes.func.isRequired,
    toggleSelectedPeriod: PropTypes.func.isRequired,
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
