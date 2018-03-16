import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Card as CardTemp, CardContent } from 'material-ui-next';
import { Typography } from 'material-ui-next';

import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import D2Lib from 'd2/lib/d2';
import parsePeriod from 'd2/lib/period/parser';
import PeriodPicker from '../../src/period-picker/PeriodPicker.component';

import TextFieldTemp from '../../src/text-field/TextFieldTemp';
import PeriodPickerTemp from '../../src/period-picker/PeriodPicker.componentTemp';

injectTapEventPlugin();

const el = document.getElementById('app');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

class PeriodPickerExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            periodType: 'Daily',
            periodType2: 'Daily',
            values: [],
            values2: [],
        };

        this.changePeriodType = this.changePeriodType.bind(this);
    }

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    changePeriodType(event) {
        const periodType = event.target.value;
        this.setState({ periodType, values: [] });
    }

    changePeriodType2 = (event) => {
        const periodType2 = event.target.value;
        console.log(`Changing PeriodType to: ${periodType2}`);
        this.setState({ periodType2, values2: [] });
    }
    render() {
        const styles = {
            card: {
                margin: 16,
                width: 370,
                float: 'left',
                transition: 'all 175ms ease-out',
            },
            cardText: {
                paddingTop: 0,
            },
            cardHeader: {
                padding: '0 16px 16px',
                margin: '16px -16px',
                borderBottom: '1px solid #eeeeee',
            },
        };

        styles.cardWide = Object.assign({}, styles.card, {
            width: (styles.card.width * 3) + (styles.card.margin * 4),
        });

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <h3> Material-UI v0 </h3>
                    <Card style={styles.card}>
                        <CardText style={styles.cardText}>
                            <h3 style={styles.cardHeader}>Props</h3>
                            <div className="scroll">
                                <div>
                                    <select
                                        value={this.state.periodType}
                                        onChange={this.changePeriodType}
                                        style={{ marginBottom: 16 }}
                                    >
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>WeeklyWednesday</option>
                                        <option>WeeklyThursday</option>
                                        <option>WeeklySaturday</option>
                                        <option>WeeklySunday</option>
                                        <option>Monthly</option>
                                        <option>BiMonthly</option>
                                        <option>Quarterly</option>
                                        <option>SixMonthly</option>
                                        <option>SixMonthlyApril</option>
                                        <option>Yearly</option>
                                        <option>FinancialApril</option>
                                        <option>FinancialJuly</option>
                                        <option>FinancialOct</option>
                                        <option value="Invalid">Invalid period type</option>
                                    </select>
                                </div>
                                <ol>
                                    {this.state.values.map((v, i) => <li key={i}>{parsePeriod(v).id} {parsePeriod(v).name}</li>)}
                                </ol>
                            </div>
                        </CardText>
                    </Card>
                    <Card style={styles.card}>
                        <CardText style={styles.cardText}>
                            <h3 style={styles.cardHeader}>Period Picker</h3>
                            <div className="scroll">
                                <PeriodPicker
                                    periodType={this.state.periodType}
                                    onPickPeriod={(value) => {
                                        this.setState({ values: this.state.values.concat(value) });
                                        console.info(`New value: ${value}`);
                                    }}
                                />
                            </div>
                        </CardText>
                    </Card>

                    <div>
                        <h3> Matieral-UI v1 </h3>
                        <CardTemp style={styles.card}>
                            <CardContent>
                                <h3 style={styles.cardHeader}> Props </h3>
                                <div className="scroll">
                                    <div>
                                        <select
                                            value={this.state.periodType2}
                                            onChange={this.changePeriodType2}
                                            style={{ marginBottom: 16 }}
                                        >
                                            <option>Daily</option>
                                            <option>Weekly</option>
                                            <option>WeeklyWednesday</option>
                                            <option>WeeklyThursday</option>
                                            <option>WeeklySaturday</option>
                                            <option>WeeklySunday</option>
                                            <option>Monthly</option>
                                            <option>BiMonthly</option>
                                            <option>Quarterly</option>
                                            <option>SixMonthly</option>
                                            <option>SixMonthlyApril</option>
                                            <option>Yearly</option>
                                            <option>FinancialApril</option>
                                            <option>FinancialJuly</option>
                                            <option>FinancialOct</option>
                                            <option value="Invalid">Invalid period type</option>
                                        </select>
                                    </div>
                                    <ol>
                                        {this.state.values2.map((v, i) => <li key={i}>{parsePeriod(v).id} {parsePeriod(v).name}</li>)}
                                    </ol>
                                </div>
                            </CardContent>
                        </CardTemp>

                        <CardTemp style={styles.card}>
                            <CardContent>
                                <h3 style={styles.cardHeader}> Period Picker </h3>
                                <div className="scroll">
                                    <PeriodPickerTemp
                                        periodType={this.state.periodType2}
                                        onPickPeriod={(value) => {
                                            this.setState({ values2: this.state.values2.concat(value) });
                                            console.info(`New value: ${value}`);
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </CardTemp>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
PeriodPickerExample.childContextTypes = { d2: PropTypes.object.isRequired };

ReactDOM.render(<div>Initialising D2...</div>, el);

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl })
    .then((d2) => {
        Object.assign(d2.i18n.translations, {
            day: 'Day',
            week: 'Week',
            year: 'Year',
            month: 'Month',
            jan: 'January',
            feb: 'February',
            mar: 'March',
            apr: 'April',
            may: ' May',
            jun: 'June',
            jul: 'July',
            aug: 'August',
            sep: 'September',
            oct: 'October',
            nov: 'November',
            dec: 'December',
            biMonth: 'Bi-Month',
            'jan-feb': 'Jan/Feb',
            'mar-apr': 'March/Apr',
            'may-jun': 'May/June',
            'jul-aug': 'July/Aug',
            'sep-oct': 'Sept/Oct',
            'nov-dec': 'Nov/Dec',
            quarter: 'Quarter',
            Q1: 'Q1 Jan - March',
            Q2: 'Q2 April - June',
            Q3: 'Q3 July - Sept',
            Q4: 'Q4 Oct - Dec',
            sixMonth: 'Period',
            'jan-jun': 'Jan - June',
            'jul-dec': 'July - Dec',
            sixMonthApril: 'Period',
            'apr-sep': 'April - Sept',
            'oct-mar': 'Oct - March',
        });

        ReactDOM.render(<PeriodPickerExample d2={d2} />, el);
    });
