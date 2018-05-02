import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListSelect } from '@dhis2/d2-ui-core';
import { DropDown } from '@dhis2/d2-ui-core';

const styles = {
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem',
    },
    dropDownStyle: {
        marginLeft: '1rem',
        marginRight: '1rem',
    },
};

const reportingRates = [
    { id: 'REPORTING_RATE', displayName: 'Reporting rate' },
    { id: 'REPORTING_RATE_ON_TIME', displayName: 'Reporting rate on time' },
    { id: 'ACTUAL_REPORTS', displayName: 'Actual reports' },
    { id: 'ACTUAL_REPORTS_ON_TIME', displayName: 'Actual reports on time' },
    { id: 'EXPECTED_REPORTS', displayName: 'Expected reports' },
];

class ReportingRatesSelector extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        i18n.strings.add('please_select_a_program');
        i18n.strings.add('no_tracked_entity_attributes');
        i18n.strings.add('no_program_indicators');
        i18n.strings.add('no_program_data_elements');
        i18n.strings.add('reporting_rates');

        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    state = {
        selectedReportingRate: 'REPORTING_RATE',
        dataSets: [],
        isLoaded: false,
    }

    componentDidMount() {
        this.context.d2.models.dataSet.list({ paging: false, fields: 'id,displayName' })
            .then(dataSetCollection => dataSetCollection.toArray())
            .then((dataSets) => {
                const dataSetItems = dataSets
                    .map(dataSet => ({
                        value: dataSet.id,
                        label: dataSet.displayName,
                    }));
                this.setState({
                    dataSets: dataSetItems,
                    isLoaded: true,
                });
            });
    }

    onSelectReportingRate = (event) => {
        this.setState({
            selectedReportingRate: event.target.value,
        });
    }

    onDoubleClickDataSet = (dataSetId) => {
        const reportingRateFormula = `R{${dataSetId}.${this.state.selectedReportingRate}}`;
        this.props.onSelect(reportingRateFormula);
    }

    render() {
        return (
            <div>
                <div style={styles.dropDownStyle}>
                    <DropDown
                        menuItems={reportingRates}
                        value={this.state.selectedReportingRate}
                        onChange={this.onSelectReportingRate}
                    />
                </div>
                {this.state.isLoaded &&
                    <ListSelect
                        onItemDoubleClick={this.onDoubleClickDataSet}
                        source={this.state.dataSets}
                        listStyle={this.props.listStyle}
                        size={12}
                    />}
            </div>
        );
    }
}


ReportingRatesSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    listStyle: PropTypes.object,
};

ReportingRatesSelector.defaultProps = {
    listStyle: styles.list,
};


ReportingRatesSelector.contextTypes = {
    d2: PropTypes.object,
};

export default ReportingRatesSelector;
