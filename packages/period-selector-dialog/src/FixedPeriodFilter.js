import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FixedPeriodsGenerator from './utils/FixedPeriodsGenerator';
import styles from './styles/PeriodListItem.style';
import isEqual from 'lodash/isEqual';

export const defaultState = {
    periodType: 'Monthly',
    year: (new Date()).getFullYear(),
    yearsOffset: 0,
    yearSelectElement: null,
};

export const YEARS_RANGE = 8;

class FixedPeriodFilter extends Component {
    constructor(props, context) {
        super(props);

        this.periodsGenerator = new FixedPeriodsGenerator();
        this.i18n = context.d2.i18n;
        this.state = defaultState;
    }

    componentDidMount = () => {
        const periods = this.generatePeriods(this.state.periodType, this.state.year);

        console.log('offeredPeriods', periods);


        this.setOfferedPeriods(periods);
    };

    componentDidUpdate(prevProps) {
        const prevItems = prevProps.selectedItems.map(period => period.id);
        const currentItems = this.props.selectedItems.map(period => period.id);

        if (!isEqual(prevItems, currentItems)) {
            this.setOfferedPeriods(this.generatePeriods(this.state.periodType, this.state.year));
        }
    }

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
        });

        if (this.state.year) {
            this.setOfferedPeriods(this.generatePeriods(event.target.value, this.state.year));
        }
    };

    onYearChange = (event) => {
        this.setState({
            year: event.target.value,
            yearSelectElement: null,
        });

        if (this.state.periodType) {
            this.setOfferedPeriods(this.generatePeriods(this.state.periodType, event.target.value));
        }
    };

    onYearSelectClick = (event) => {
        this.setState({ yearSelectElement: event.currentTarget });
    };

    getYears = () => {
        let years = [];

        years = years.concat(
            [...Array((Math.floor(YEARS_RANGE / 2)) + (YEARS_RANGE % 2 === 0 ? 1 : 2)).keys()]
                .slice(1)
                .reverse()
                .map(offset => ((new Date()).getFullYear() - offset) + this.state.yearsOffset),
        );

        years = years.concat(
            [...Array(Math.floor(YEARS_RANGE / 2)).keys()]
                .map(offset => (new Date()).getFullYear() + offset + this.state.yearsOffset),
        );

        return years;
    };

    setOfferedPeriods = (periods) => {
        const selectedIds = this.props.selectedItems.map(period => period.id);

        this.props.setOfferedPeriodIds(periods);
        this.props.setOfferedPeriods(periods.filter(period => !selectedIds.includes(period.id)));
    };

    generatePeriods = (periodType, year) => {
        const generator = this.periodsGenerator.get(periodType);

        return generator.generatePeriods({
            offset: year - (new Date()).getFullYear(),
            filterFuturePeriods: false,
            reversePeriods: false,
        });
    };

    selectAll = () => {
        console.log('FixedPeriodSelector selectAll');

        this.props.onSelect(this.props.items);
        this.props.setOfferedPeriods([]);
    };

    closeYearSelect = () => {
        this.setState({ yearSelectElement: null });
    };

    shiftYearsBack = () => {
        this.setState({ yearsOffset: this.state.yearsOffset - YEARS_RANGE });
    };

    shiftYearsForth = () => {
        this.setState({ yearsOffset: this.state.yearsOffset + YEARS_RANGE });
    };

    renderYearSelectValue = () => this.state.year;

    render() {
        const years = this.getYears();

        return (
            <div className="options-area">
                <FormControl className="form-control period-type">
                    <InputLabel style={styles.inputLabel} className="input-label" htmlFor="period-type">
                        {i18n.t('Period type')}
                    </InputLabel>
                    <Select
                        onChange={this.onPeriodTypeChange}
                        value={this.state.periodType}
                        inputProps={{ name: 'periodType', id: 'period-type' }}
                        disableUnderline
                    >
                        {this.periodsGenerator.getOptions()
                            .map(option =>
                                <MenuItem value={option} key={option}>{option}</MenuItem>,
                            )}
                    </Select>
                </FormControl>
                <FormControl className="form-control year">
                    <InputLabel style={styles.inputLabel} className="input-label" htmlFor="year">
                        {i18n.t('Year')}
                    </InputLabel>
                    <Select
                        SelectDisplayProps={{
                            id: 'year-select',
                            onClick: this.onYearSelectClick,
                        }}
                        value={this.state.year}
                        inputProps={{ name: 'year', id: 'year' }}
                        renderValue={this.renderYearSelectValue}
                        disableUnderline
                        disabled
                    />
                    <Menu
                        MenuListProps={{
                            id: 'year-select-menu',
                        }}
                        anchorEl={this.state.yearSelectElement}
                        open={Boolean(this.state.yearSelectElement)}
                        onClose={this.closeYearSelect}
                    >
                        <MenuItem
                            value=""
                            key="shiftYearsBack"
                            onClick={this.shiftYearsBack}
                        >
                            <ArrowUpIcon />
                        </MenuItem>
                        {years.map(year => (
                            <MenuItem
                                onClick={this.onYearChange}
                                key={year}
                                value={year}
                                selected={this.state.year === year}
                            >
                                {year}
                            </MenuItem>
                        ))}
                        <MenuItem
                            value=""
                            key="shiftYearsForth"
                            onClick={this.shiftYearsForth}
                        >
                            <ArrowDownIcon />
                        </MenuItem>
                    </Menu>
                </FormControl>
            </div>
        );
    };
}

FixedPeriodFilter.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    onPeriodDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    setOfferedPeriodIds: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

FixedPeriodFilter.contextTypes = {
    d2: PropTypes.object,
};

export default FixedPeriodFilter;
