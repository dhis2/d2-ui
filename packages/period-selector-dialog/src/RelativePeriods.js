import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '@dhis2/d2-i18n';
import RelativePeriodsGenerator from './utils/RelativePeriodsGenerator';
import PeriodsList from './PeriodsList';

export const defaultState = {
    periodType: 'Weeks',
};

class RelativePeriods extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.periodsGenerator = new RelativePeriodsGenerator();
    }

    componentDidMount = () => {
        this.props.setOfferedPeriods(this.generatePeriods(this.state.periodType));
    };

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
                <InputLabel className="input-label" htmlFor="period-type">
                    {i18n.t('Period type')}
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

    render = () => {
        const Options = this.renderOptions();

        return (
            <div className="selector-area">
                {Options}
                <PeriodsList
                    items={this.props.items}
                    onPeriodClick={this.props.onPeriodClick}
                    onDoubleClick={this.props.onDoubleClick}
                    listClassName={'periods-list-offered'}
                />
            </div>
        );
    };
}

RelativePeriods.propTypes = {
    items: PropTypes.array.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

export default RelativePeriods;
