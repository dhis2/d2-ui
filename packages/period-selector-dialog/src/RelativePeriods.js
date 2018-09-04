import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
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

    generatePeriods = (periodType) => {
        const generator = this.periodsGenerator.get(periodType);

        return generator.generatePeriods();
    };

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
        });

        this.props.setOfferedPeriods(this.generatePeriods(event.target.value));
    };

    renderOptions = () => {
        return <Fragment>
            <FormControl className="form-control period-type">
                <InputLabel htmlFor="period-type">
                    {this.i18n.getTranslation('Period type')}
                </InputLabel>
                <Select
                    onChange={this.onPeriodTypeChange}
                    value={this.state.periodType}
                    inputProps={{ name: 'periodType', id: 'period-type' }}
                >
                    {this.periodsGenerator.getOptions().map((option, i) => {
                        return <MenuItem value={option} key={i}>{option}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Fragment>;
    };

    render() {
        return <div className="selector-area">
            {this.renderOptions()}
            <PeriodsList periods={this.props.periods} onPeriodClick={this.props.onPeriodClick}/>
        </div>
    }
}

RelativePeriods.contextTypes = {
    d2: PropTypes.object
};

export default RelativePeriods;
