import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RelativePeriodsGenerator from './utils/RelativePeriodsGenerator';
import PeriodsList from './PeriodsList';

export const defaultState = {
    periodType: '',
};

class RelativePeriods extends Component {
    constructor(props, context) {
        super(props);

        this.state = defaultState;
        this.i18n = context.d2.i18n;
        this.periodsGenerator = new RelativePeriodsGenerator();
    }

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
        });

        this.props.setOfferedPeriods(this.generatePeriods(event.target.value));
    };

    generatePeriods = (periodType) => {
        const generator = this.periodsGenerator.get(periodType);
        return generator.generatePeriods();
    };

    renderOptions = () => (
        <div className="options-area">
            <FormControl className="form-control period-type">
                <InputLabel htmlFor="period-type">
                    {this.i18n.getTranslation('Period type')}
                </InputLabel>
                <Select
                    onChange={this.onPeriodTypeChange}
                    value={this.state.periodType}
                    inputProps={{ name: 'periodType', id: 'period-type' }}
                    disableUnderline
                    variant="filled"
                >
                    {this.periodsGenerator.getOptions().map(option =>
                        (<MenuItem value={option} key={option}>{option}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </div>
    );

    render = () => (
        <div className="selector-area">
            {this.renderOptions()}
            <PeriodsList
                periods={this.props.periods}
                onPeriodClick={this.props.onPeriodClick}
                onDoubleClick={this.props.onDoubleClick}
                listClassName={'periods-list-offered'}
            />
        </div>
    )
}

RelativePeriods.propTypes = {
    periods: PropTypes.array.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

RelativePeriods.contextTypes = {
    d2: PropTypes.object,
};

export default RelativePeriods;
