import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '@dhis2/d2-i18n';
import Button from '@material-ui/core/Button';
import RelativePeriodsGenerator from './utils/RelativePeriodsGenerator';
import PeriodsList from './PeriodsList';

export const defaultState = {
    periodType: 'Months',
};

class RelativePeriods extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.periodsGenerator = new RelativePeriodsGenerator();
    }

    componentDidMount() {
        const periods = this.generatePeriods(this.state.periodType);
        const selectedIds = this.props.selectedItems.map(period => period.id);

        this.props.setOfferedPeriods(periods.filter(period => !selectedIds.includes(period.id)));
    }

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
        });

        this.props.setOfferedPeriods(this.generatePeriods(event.target.value));
    };

    generatePeriods = (periodType) => {
        const generator = this.periodsGenerator.get(periodType);
        const selectedIds = this.props.selectedItems.map(item => item.id);

        return generator.generatePeriods().filter(item => !selectedIds.includes(item.id));
    };

    selectAll = () => {
        this.props.addSelectedPeriods(this.props.items);
        this.props.setOfferedPeriods([]);
    };

    renderOptions = () => (
        <div className="options-area">
            <FormControl className="form-control-period-type">
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

    render() {
        const Options = this.renderOptions();

        return (
            <div className="block-offered-periods">
                {Options}
                <PeriodsList
                    className="periods-list-offered"
                    items={this.props.items}
                    onPeriodClick={this.props.onPeriodClick}
                    onPeriodDoubleClick={this.props.onPeriodDoubleClick}
                />
                <div className="move-all-items-button">
                    <Button onClick={this.selectAll}>
                        {i18n.t('Select all')}
                    </Button>
                </div>
            </div>
        );
    }
}

RelativePeriods.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    addSelectedPeriods: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

export default RelativePeriods;
