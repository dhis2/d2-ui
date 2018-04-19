import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {PeriodPicker} from 'd2-ui-core';
import parsePeriod from 'd2/lib/period/parser';

export default class PeriodPickerExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            periodType: 'Daily',
            values: [],
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
                </div>
            </MuiThemeProvider>
        );
    }
}

PeriodPickerExample.childContextTypes = { d2: PropTypes.object.isRequired };
