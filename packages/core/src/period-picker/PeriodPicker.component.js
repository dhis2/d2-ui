import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { is53WeekISOYear, getFirstDateOfWeek } from 'd2/period/helpers';

const styles = {
    datePicker: { width: '100%' },
    year: { width: 95, marginRight: 16 },
    month: { width: 125 },
    week: { width: 105 },
    biWeek: { width: 200 },
    biMonth: { width: 200 },
    quarter: { width: 200 },
    sixMonth: { width: 200 },
    line: { marginTop: 0 },
};

const getYear = date => (new Date(date)).getFullYear().toString();
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

const biWeekToWeek = (biWeekStr) => 
    (parseInt(biWeekStr) * 2) - 1;

class PeriodPicker extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        const i18n = context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    componentDidUpdate(prevProps) {
        if(this.props.periodType !== prevProps.periodType) {
           this.handleChange();
        }
    }

    getPeriod() {
        const week = this.props.periodType === 'BiWeekly' && this.state.biWeek 
            ? biWeekToWeek(this.state.biWeek)
            : this.state.week;
        const date = this.state.year && week && getFirstDateOfWeek(this.state.year, week);
        
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
        case 'BiWeekly':
            if (date) {
                this.setState({ invalidBiWeek: !isWeekValid(date, biWeekToWeek(this.state.biWeek)) });
            }
            return this.state.year && this.state.biWeek && `${this.state.year}BiW${this.state.biWeek}`;
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
        case 'SixMonthlyNov':
            return this.state.year && this.state.sixMonth && `${this.state.year}NovS${this.state.sixMonth}`;
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
        }
    }

    renderOptionPicker(name, options) {
        const changeState = (e, i, value) => this.setState({ [name]: value }, this.handleChange);
        const isInvalid = (name === 'week' && this.state.invalidWeek)
            || (name === 'biWeek' && this.state.invalidBiWeek);

        return (
            <SelectField
                value={this.state[name]}
                onChange={changeState}
                style={styles[name]}
                floatingLabelText={this.getTranslation(name)}
                floatingLabelStyle={isInvalid ? { color: 'red' } : {}}
            >
                {Object.keys(options).sort().map((value) => (
                    <MenuItem
                        key={value}
                        value={value}
                        primaryText={
                            /[^0-9]/.test(options[value]) && name !== 'biWeek'
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

    renderBiWeekPicker() {
        const biWeeks = {};
        const biWeekLimit = 27;
        const prefix = this.getTranslation('bi_week')
        for (let biWeek = 1; biWeek <= biWeekLimit; biWeek++) {
            biWeeks[`0${biWeek}`.substr(-2)] = `${prefix} ${biWeek}`;
        }

        return this.renderOptionPicker('biWeek', biWeeks);
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
            const year = getYear(date);
            const month = getTwoDigitMonth(date);
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
        case 'WeeklyWednesday':
        case 'WeeklyThursday':
        case 'WeeklySaturday':
        case 'WeeklySunday':
            return <div style={styles.line}>{this.renderYearPicker()}{this.renderWeekPicker()}</div>;
        case 'BiWeekly':
            return <div style={styles.line}>{this.renderYearPicker()}{this.renderBiWeekPicker()}</div>;
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
        case 'SixMonthlyNov':
            return (
                <div style={styles.line}>
                    {this.renderYearPicker()}
                    {this.renderOptionPicker('sixMonth', { 1: 'nov-apr', 2: 'may-oct' })}
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
    periodType: PropTypes.oneOf([
        'Daily',
        'Weekly',
        'WeeklyWednesday',
        'WeeklyThursday',
        'WeeklySaturday',
        'WeeklySunday',
        'BiWeekly',
        'Monthly',
        'BiMonthly',
        'Quarterly',
        'SixMonthly',
        'SixMonthlyApril',
        'SixMonthlyNov',
        'Yearly',
        'FinancialApril',
        'FinancialJuly',
        'FinancialOct',
    ]).isRequired,

    onPickPeriod: PropTypes.func.isRequired,
};
PeriodPicker.contextTypes = { d2: PropTypes.object.isRequired };

export default PeriodPicker;
