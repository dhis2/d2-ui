import React from 'react';
import moment from 'moment';
import log from 'loglevel';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const styles = {
    datePicker: { width: '100%' },
    year: { width: 55, marginRight: 16 },
    month: { width: 105 },
    week: { width: 105 },
    biMonth: { width: 200 },
    quarter: { width: 200 },
    sixMonth: { width: 200 },
    line: { marginTop: 0 },
};


class PeriodPicker extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
    }

    getPeriod() {
        switch (this.props.periodType) {
        case 'Daily':
            return this.state.date && moment(this.state.date).format('YYYYMMDD');
        case 'Weekly':
            const date = this.state.year && this.state.week &&
                moment(`${this.state.year}W${this.state.week}`, 'YYYY-[W]WW');
            if (date) {
                this.setState({ invalidWeek: !date.isValid() });
            }
            return date && date.isValid() && date.format('GGGG[W]W');
        case 'Monthly':
            return this.state.year && this.state.month && `${this.state.year}${this.state.month}`;
        case 'BiMonthly':
            return this.state.year && this.state.biMonth && `${this.state.year}0${this.state.biMonth}B`;
        case 'Quarterly':
            return this.state.year && this.state.quarter && `${this.state.year}Q${this.state.quarter}`;
        case 'SixMonthly':
            return this.state.year && this.state.sixMonth && `${this.state.year}S${this.state.sixMonth}`;
        case 'SixMonthlyApril':
            return this.state.year && this.state.sixMonth && `${this.state.year}AprilS${this.state.sixMonth}`;
        case 'Yearly':
            return this.state.year;
        case 'FinancialApril':
            return this.state.year && `${this.state.year}April`;
        case 'FinancialJuly':
            return this.state.year && `${this.state.year}July`;
        case 'FinancialOct':
            return this.state.year && `${this.state.year}Oct`;

        default:
            log.error(`Unknown period type: ${this.props.periodType}`);
            return false;
        }
    }

    handleChange() {
        if (this.getPeriod()) {
            this.props.onPickPeriod(this.getPeriod());
            // Reset detail fields
            this.setState({
                date: undefined,
                week: undefined,
                month: undefined,
                biMonth: undefined,
                quarter: undefined,
                sixMonth: undefined,
            });
        }
    }

    renderOptionPicker(name, options) {
        const changeState = (e, i, value) => this.setState({ [name]: value }, this.handleChange);
        const isInvalid = name === 'week' && this.state.invalidWeek;

        return (
            <SelectField
                value={this.state[name]}
                onChange={changeState}
                style={styles[name]}
                floatingLabelText={this.getTranslation(name)}
                floatingLabelStyle={isInvalid ? { color: 'red' } : {}}
            >
                <MenuItem key="" value={this.state[name]} primaryText="&nbsp;"/>
                {Object.keys(options).sort().map((value, i) => (
                    <MenuItem
                        key={i}
                        value={value}
                        primaryText={
                            /[^0-9]/.test(options[value])
                                ? this.getTranslation(options[value])
                                : options[value]
                        }
                    />
                ))}
            </SelectField>
        );
    }

    renderYearPicker() {
        const years = {};
        const currentYear = new Date().getFullYear();
        for (let year = 2014; year < currentYear + 5; year++) {
            years[year] = year;
        }

        return this.renderOptionPicker('year', years);
    }

    renderMonthPicker() {
        const months = {
            '01': 'jan', '02': 'feb', '03': 'mar', '04': 'apr', '05': 'may', '06': 'jun',
            '07': 'jul', '08': 'aug', '09': 'sep', '10': 'oct', '11': 'nov', '12': 'dec',
        };
        return this.renderOptionPicker('month', months);
    }

    renderWeekPicker() {
        const weeks = {};
        const weekLimit = 53;
        for(let week = 1; week <= weekLimit; week++) {
            weeks[`0${week}`.substr(-2)] = week;
        }

        return this.renderOptionPicker('week', weeks);
    }

    renderBiMonthPicker() {
        const biMonths = { 1: 'jan-feb', 2: 'mar-apr', 3: 'may-jun', 4: 'jul-aug', 5: 'sep-oct', 6: 'nov-dec' };
        return this.renderOptionPicker('biMonth', biMonths);
    }

    renderQuarterPicker() {
        const quarters = { 1: 'Q1', 2: 'Q2', 3: 'Q3', 4: 'Q4' };
        return this.renderOptionPicker('quarter', quarters);
    }

    render() {
        const setDateState = (nothing, date) => {
            const year = moment(date).format('YYYY');
            const month = moment(date).format('MM');
            this.setState({ date, year, month }, this.handleChange);
        };

        switch (this.props.periodType) {
        case 'Daily':
            return (
                <DatePicker
                    floatingLabelText={this.getTranslation('day')}
                    onChange={setDateState}
                    autoOk
                    container="inline"
                    style={styles.datePicker}
                />
            );
        case 'Weekly':
            return <div style={styles.line}>{this.renderYearPicker()}{this.renderWeekPicker()}</div>;
        case 'Monthly':
            return <div style={styles.line}>{this.renderYearPicker()}{this.renderMonthPicker()}</div>;
        case 'BiMonthly':
            return <div style={styles.line}>{this.renderYearPicker()}{this.renderBiMonthPicker()}</div>;
        case 'Quarterly':
            return <div style={styles.line}>{this.renderYearPicker()}{this.renderQuarterPicker()}</div>;
        case 'SixMonthly':
            return (
                <div style={styles.line}>
                    {this.renderYearPicker()}
                    {this.renderOptionPicker('sixMonth', { 1: 'jan-jun', 2: 'jul-dec' })}
                </div>
            );
        case 'SixMonthlyApril':
            return (
                <div style={styles.line}>
                    {this.renderYearPicker()}
                    {this.renderOptionPicker('sixMonth', { 1: 'apr-sep', 2: 'oct-mar' })}
                </div>
            );
        case 'Yearly':
        case 'FinancialApril':
        case 'FinancialJuly':
        case 'FinancialOct':
            return <div style={styles.line}>{this.renderYearPicker()}</div>;

        default: return null;
        }
    }
}
PeriodPicker.propTypes = {
    periodType: React.PropTypes.oneOf([
        'Daily',
        'Weekly',
        'Monthly',
        'BiMonthly',
        'Quarterly',
        'SixMonthly',
        'SixMonthlyApril',
        'Yearly',
        'FinancialApril',
        'FinancialJuly',
        'FinancialOct'
    ]).isRequired,

    onPickPeriod: React.PropTypes.func.isRequired,
};
PeriodPicker.contextTypes = { d2: React.PropTypes.object.isRequired };

export default PeriodPicker;
