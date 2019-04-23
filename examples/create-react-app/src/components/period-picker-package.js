import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import PeriodPicker from '@dhis2/d2-ui-period-picker';
import parsePeriod from 'd2/period/parser';

const DUMMY_PERIOD = '2017ThuW4';

export default class PeriodPickerPackageExample extends React.Component {
    state = {
        selectedPeriod: '',
        selectedPeriods: [],
        periodIdStr: DUMMY_PERIOD,
    };

    updatePeriodIdStr = event => {
        this.setState({ periodIdStr: event.target.value });
    };

    onPeriodChange = period => {
        this.setState({
            selectedPeriod: period,
            selectedPeriods: [
                ...this.state.selectedPeriods,
                parsePeriod(period),
            ],
        });
    };

    setPeriodFromParent = () => {
        this.setState({
            selectedPeriod: this.state.periodIdStr,
        });
    };

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
            table: {
                width: '100%',
                marginBottom: 8,
            },
            th: {
                textAlign: 'left',
            },
            input: {
                marginRight: 8,
            },
            demoElementContainer: {
                backgroundColor: '#eaeaea',
                width: 'calc(100% - 8px)',
                padding: 8,
                marginTop: 16,
            },
        };

        styles.cardWide = Object.assign({}, styles.card, {
            width: styles.card.width * 3 + styles.card.margin * 4,
        });

        return (
            <div>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>
                            Period Picker (package)
                        </h3>
                        <div className="scroll">
                            <PeriodPicker
                                d2={this.context.d2}
                                label="Report period"
                                value={this.state.selectedPeriod}
                                onChange={this.onPeriodChange}
                            />
                        </div>
                        <div style={styles.demoElementContainer}>
                            {this.state.selectedPeriods.length > 0 && (
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>ID</th>
                                            <th style={styles.th}>
                                                Display value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.selectedPeriods.map(
                                            (v, i) => (
                                                <tr key={i}>
                                                    <td>{v.id}</td>
                                                    <td>{v.name}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            <input
                                type="text"
                                onChange={this.updatePeriodIdStr}
                                value={this.state.periodIdStr}
                                style={styles.input}
                            />
                            <button onClick={this.setPeriodFromParent}>
                                Set period via props
                            </button>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

PeriodPickerPackageExample.contextTypes = {
    d2: PropTypes.object,
};
