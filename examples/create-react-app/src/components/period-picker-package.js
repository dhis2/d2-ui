import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import PeriodPicker from '@dhis2/d2-ui-period-picker';

const DUMMY_PERIOD = '2017ThuW4';

export default class PeriodPickerPackageExample extends React.Component {
    state = {
        periodTypes: [],
        selectedPeriod: null,
        selectedPeriods: [],
    };

    onPeriodChange = period => {
        this.setState({
            selectedPeriods: [...this.state.selectedPeriods, period],
        });
    };

    setDummySelectedPeriod = () => {
        this.setState({ selectedPeriod: DUMMY_PERIOD });
    };

    componentDidMount() {}

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
                                periodTypes={this.state.periodTypes}
                                selectedPeriod={this.state.selectedPeriod}
                                onChange={this.onPeriodChange}
                            />
                        </div>
                        <button onClick={this.onPeriodChange}>
                            Set period to {DUMMY_PERIOD} via props
                        </button>
                        <ol>
                            {this.state.selectedPeriods.map((v, i) => (
                                <li key={i}>{v}</li>
                            ))}
                        </ol>
                    </CardText>
                    <ol>{this.state.selectedPeriods}</ol>
                </Card>
            </div>
        );
    }
}
