import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { is53WeekISOYear, getFirstDateOfWeek } from 'd2/lib/period/helpers';

import MenuItem from 'material-ui-next/Menu';
import SelectTemp from '../../src/select-field/SelectTemp';
import TextFieldTemp from '../../src/text-field/TextFieldTemp';

const styles = {
    datePicker: { width: '100%' },
    year: { width: 95, marginRight: 16 },
    month: { width: 125 },
    week: { width: 105 },
    biMonth: { width: 200 },
    quarter: { width: 200 },
    sixMonth: { width: 200 },
    line: { marginTop: 0 },
};

const getYear = date => (new Date(date)).getFullYear();
const getTwoDigitMonth = (date) => {
    const month = (new Date(date)).getMonth() + 1; // Month is 0 indexed

    return `0${month}`.slice(-2);
};
const getTwoDigitDay = (date) => {
    const day = (new Date(date)).getDate();

    return `0${day}`.slice(-2);
};
const formattedDate = date => `${getYear(date)}${getTwoDigitMonth(date)}${getTwoDigitDay(date)}`;
const getWeekYear = (date) => {
    // Create a new date object for the thursday of this week
    const target = new Date(date);
    target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);

    return target.getFullYear();
};
const isWeekValid = (date, week) =>
    // It's not possible to have a week 53 in a 52 week year
    !is53WeekISOYear(date) && Number(week) !== 53
;

class PeriodPickerTemp extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        const i18n = context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    getPeriod() {
        const date = this.state.year && this.state.week && getFirstDateOfWeek(this.state.year, this.state.week);
        switch (this.props.periodType) {
        case 'Daily':
            return this.state.date && formattedDate(this.state.date);
        case 'Weekly':
            if (date) {
                this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
            }
            return date && isWeekValid(date, this.state.week) && `${getWeekYear(date)}W${this.state.week}`;
        case 'WeeklyWednesday':
            if (date) {
                this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
            }
            return date && isWeekValid(date, this.state.week) && `${getWeekYear(date)}WedW${this.state.week}`;
        case 'WeeklyThursday':
            if (date) {
                this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
            }
            return date && isWeekValid(date, this.state.week) && `${getWeekYear(date)}ThuW${this.state.week}`;
        case 'WeeklySaturday':
            if (date) {
                this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
            }
            return date && isWeekValid(date, this.state.week) && `${getWeekYear(date)}SatW${this.state.week}`;
        case 'WeeklySunday':
            if (date) {
                this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
            }
            return date && isWeekValid(date, this.state.week) && `${getWeekYear(date)}SunW${this.state.week}`;
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
        this.setState()
    }

    renderOptionPicker(name, options) {
        const changeState = (e, i, value) => this.setState({ [name]: value }, this.handleChange);
        const isInvalid = name === 'week' && this.state.invalidWeek;

        return (
            <SelectTemp
                value={this.state[name]}
                onChange={changeState}
                style={styles[name]}
                floatingLabelText={this.getTranslation(name)}
                floatingLabelStyle={isInvalid ? { color: 'red' } : {}}
            >
                <MenuItem key="" value={this.state[name]} primaryText="&nbsp;" />
                {Object.keys(options).sort().map(value => (
                    <MenuItem
                        key={value}
                        value={value}
                        primaryText={
                            /[^0-9]/.test(options[value])
                                ? this.getTranslation(options[value])
                                : options[value]
                        }
                    />
                ))}
            </SelectTemp>
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
            '01': 'jan',
            '02': 'feb',
            '03': 'mar',
            '04': 'apr',
            '05': 'may',
            '06': 'jun',
            '07': 'jul',
            '08': 'aug',
            '09': 'sep',
            10: 'oct',
            11: 'nov',
            12: 'dec',
        };
        return this.renderOptionPicker('month', months);
    }

    renderWeekPicker() {
        const weeks = {};
        const weekLimit = 53;
        for (let week = 1; week <= weekLimit; week++) {
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
            const temp = nothing.target.value;

            console.log(nothing.target.value);
            console.log(temp);
            const year = getYear(date);
            const month = getTwoDigitMonth(date);
            this.setState({ date, year, month }, this.handleChange);
        };

        switch (this.props.periodType) {
        case 'Daily':
            return (
                <TextFieldTemp
                    label={this.getTranslation('day')}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.props.onPickPeriod}
                    style={styles.datePicker}
                />
            );
        case 'Weekly':
        case 'WeeklyWednesday':
        case 'WeeklyThursday':
        case 'WeeklySaturday':
        case 'WeeklySunday':
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
PeriodPickerTemp.propTypes = {
    periodType: PropTypes.oneOf([
        'Daily',
        'Weekly',
        'WeeklyWednesday',
        'WeeklyThursday',
        'WeeklySaturday',
        'WeeklySunday',
        'Monthly',
        'BiMonthly',
        'Quarterly',
        'SixMonthly',
        'SixMonthlyApril',
        'Yearly',
        'FinancialApril',
        'FinancialJuly',
        'FinancialOct',
    ]).isRequired,

    onPickPeriod: PropTypes.func.isRequired,
};
PeriodPickerTemp.contextTypes = { d2: PropTypes.object.isRequired };

export default PeriodPickerTemp;
