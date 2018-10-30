import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import FixedPeriodsGenerator from './utils/FixedPeriodsGenerator';
import PeriodsList from './PeriodsList';

export const defaultState = {
    periodType: 'Weekly',
    year: (new Date()).getFullYear(),
};

class FixedPeriods extends Component {
    constructor(props, context) {
        super(props);

        this.periodsGenerator = new FixedPeriodsGenerator();
        this.i18n = context.d2.i18n;
        this.years = this.getYears();
        this.state = defaultState;
    }

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
        });

        if (this.state.year) {
            this.props.setOfferedPeriods(this.generatePeriods(event.target.value, this.state.year));
        }
    };

    onYearChange = (event) => {
        this.setState({
            year: event.target.value,
        });

        if (this.state.periodType) {
            this.props.setOfferedPeriods(this.generatePeriods(this.state.periodType, event.target.value));
        }
    };

    getYears = () => {
        let years = [];
        years = years.concat([0, 1, 2, 3, 4].map(offset => (new Date()).getFullYear() - offset));
        years = years.concat([1, 2, 3, 4].map(offset => (new Date()).getFullYear() + offset));

        return years;
    };

    generatePeriods = (periodType, year) => {
        const generator = this.periodsGenerator.get(periodType);

        return generator.generatePeriods({
            offset: year - (new Date()).getFullYear(),
            filterFuturePeriods: false,
            reversePeriods: false,
        });
    };

    componentDidMount = () => {
        this.props.setOfferedPeriods(this.generatePeriods(this.state.periodType, this.state.year));
    };

    renderOptions = () => (
        <div className="options-area">
            <FormControl className="form-control period-type">
                <InputLabel className="input-label" htmlFor="period-type">
                    {this.i18n.getTranslation('Period type')}
                </InputLabel>
                <Select
                    onChange={this.onPeriodTypeChange}
                    value={this.state.periodType}
                    inputProps={{ name: 'periodType', id: 'period-type' }}
                    disableUnderline
                >
                    {this.periodsGenerator.getOptions().map(option =>
                        <MenuItem value={option} key={option}>{option}</MenuItem>,
                    )}
                </Select>
            </FormControl>
            <FormControl className="form-control year">
                <InputLabel className="input-label" htmlFor="year">
                    {this.i18n.getTranslation('Year')}
                </InputLabel>
                <Select
                    onChange={this.onYearChange}
                    value={this.state.year}
                    inputProps={{ name: 'year', id: 'year' }}
                    disableUnderline
                >
                    {this.years.sort().map(year => <MenuItem value={year} key={year}>{year}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );

    render = () => {
        const Options = this.renderOptions();

        return (
            <div className="selector-area">
                {Options}
                <PeriodsList
                    items={this.props.items}
                    onDoubleClick={this.props.onDoubleClick}
                    onPeriodClick={this.props.onPeriodClick}
                    listClassName={'periods-list-offered'}
                />
            </div>
        );
    };
}

FixedPeriods.propTypes = {
    items: PropTypes.array.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
};

FixedPeriods.contextTypes = {
    d2: PropTypes.object,
};

export default FixedPeriods;
