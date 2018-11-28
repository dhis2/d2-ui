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
import styles from './styles/PeriodListItem.style';

export const defaultState = {
    periodType: 'Months',
};

class RelativePeriods extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.periodsGenerator = new RelativePeriodsGenerator();
    }

    componentDidMount = () => {
        const periods = this.generatePeriods(this.state.periodType);

        this.setOfferedPeriods(periods);
    };

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
        });

        this.setOfferedPeriods(this.generatePeriods(event.target.value));
    };

    setOfferedPeriods = (periods) => {
        const selectedIds = this.props.selectedItems.map(period => period.id);

        this.props.setOfferedPeriodIds(periods);
        this.props.setOfferedPeriods(periods.filter(period => !selectedIds.includes(period.id)));
    };

    generatePeriods = (periodType) => {
        const generator = this.periodsGenerator.get(periodType);

        return generator.generatePeriods();
    };

    selectAll = () => {
        this.props.addSelectedPeriods(this.props.items);
        this.setOfferedPeriods([]);
    };

    renderOptions = () => (
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
                    onPeriodDoubleClick={this.props.onPeriodDoubleClick}
                    listClassName={'periods-list-offered'}
                />
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={this.selectAll}>
                        {i18n.t('Select all')}
                    </Button>
                </div>
            </div>
        );
    };
}

RelativePeriods.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    setOfferedPeriods: PropTypes.func.isRequired,
    setOfferedPeriodIds: PropTypes.func.isRequired,
    addSelectedPeriods: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

export default RelativePeriods;
