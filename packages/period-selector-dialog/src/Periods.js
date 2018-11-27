import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeriodTypeButton from './PeriodTypeButton';
import SelectedPeriods from './SelectedPeriods';
import { OfferedPeriods } from './OfferedPeriods';
import PeriodTypes from './PeriodTypes';
import styles from './styles/PeriodListItem.style';
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

const SelectButton = ({ action }) => (
    <IconButton
        style={styles.arrowButton}
        className="select-button"
        onClick={action}
    >
        <ArrowForwardIcon style={styles.arrowIcon} />
    </IconButton>
);

SelectButton.propTypes = {
    action: PropTypes.func.isRequired,
};

const DeselectButton = ({ action }) => (
    <IconButton
        style={styles.arrowButton}
        className="select-button"
        onClick={action}
    >
        <ArrowBackIcon style={styles.arrowIcon} />
    </IconButton>
);

DeselectButton.propTypes = {
    action: PropTypes.func.isRequired,
};

class Periods extends Component {
    constructor(props) {
        super(props);

        this.props.setSelectedPeriods(this.props.selectedItems);
    }

    componentDidUpdate(prevProps) {
        const prevItems = prevProps.selectedItems.map(period => period.id);
        const currentItems = this.props.selectedItems.map(period => period.id);

        if (prevItems.length !== currentItems.length) {
            this.props.setSelectedPeriods(this.props.selectedItems);
        } else {
            for (let i = 0; i < prevItems.length; ++i) {
                if (prevItems[i] !== currentItems[i]) {
                    this.props.setSelectedPeriods(this.props.selectedItems);

                    break;
                }
            }
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
        this.props.addOfferedPeriods(removedPeriods);
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
        this.props.addOfferedPeriods(itemToAdd);
    };

    onRemovePeriod = (removedPeriod) => {
        const itemToRemove = [removedPeriod];

        this.props.onDeselect(itemToRemove);
        this.props.removeSelectedPeriods(itemToRemove);
        this.props.addOfferedPeriods(itemToRemove);
    };

    onClearAll = (removedPeriods) => {
        this.props.onDeselect(removedPeriods);
        this.props.addOfferedPeriods(removedPeriods);
        this.props.setSelectedPeriods([]);
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

    render = () => {
        const PeriodTypeButtons = this.renderPeriodTypeButtons();
        const SelectButtons = this.renderSelectButtons();

        return (
            <div>
                {PeriodTypeButtons}
                <div className="periods-container">
                    <div className="block options">
                        <OfferedPeriods
                            periodType={this.props.periodType}
                            items={this.props.offeredPeriods.periods}
                            onPeriodDoubleClick={this.onOfferedPeriodDoubleClick}
                            onPeriodClick={this.props.toggleOfferedPeriod}
                            setOfferedPeriods={this.props.setOfferedPeriods}
                            addSelectedPeriods={this.props.addSelectedPeriods}
                            selectedItems={this.props.selectedItems}
                        />
                    </div>
                    <div className="block buttons">
                        {SelectButtons}
                    </div>
                    <div className="block selected-periods">
                        <SelectedPeriods
                            items={this.props.selectedPeriods.periods}
                            onClearAll={this.onClearAll}
                            onPeriodDoubleClick={this.onSelectedPeriodDoubleClick}
                            onPeriodClick={this.props.toggleSelectedPeriod}
                            onRemovePeriodClick={this.onRemovePeriod}
                        />
                    </div>
                </div>
            </div>
        );
    };
}

Periods.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
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
