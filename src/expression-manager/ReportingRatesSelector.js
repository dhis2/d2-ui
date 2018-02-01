import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { config } from 'd2/lib/d2';

import ListSelect from '../list-select/ListSelect.component';
import DropDownForSchemaReference from './DropDownForSchemaReference';

config.i18n.strings.add('please_select_a_program');
config.i18n.strings.add('no_tracked_entity_attributes');
config.i18n.strings.add('no_program_indicators');
config.i18n.strings.add('no_program_data_elements');

const styles = {
    listStyle: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem',
    },
    noValueMessageStyle: {
        padding: '1rem',
    },

    dropDownStyle: {
        margin: '0 1rem',
    },
};

const reportingRates = [
    { value: 'REPORTING_RATE', label: 'Reporting rate' },
    { value: 'REPORTING_RATE_ON_TIME', label: 'Reporting rate on time' },
    { value: 'ACTUAL_REPORTS', label: 'Actual reports' },
    { value: 'ACTUAL_REPORTS_ON_TIME', label: 'Actual reports on time' },
    { value: 'EXPECTED_REPORTS', label: 'Expected reports' },
];

class ReportingRatesSelector extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    state = {
        dataSetId: '',
    }

    onSelectDataSet = (event) => {
        this.setState({
            dataSetId: event.target.value,
        });
    }

    onDoubleClickReportingRate = (reportingRate) => {
        const reportingRateFormula = `S{${this.state.dataSetId}.${reportingRate}}`;
        this.props.onSelect(reportingRateFormula);
        console.log(reportingRateFormula);
    }

    render() {
        return (
            <div>
                <div style={styles.dropDownStyle}>
                    <DropDownForSchemaReference
                        schema="dataSet"
                        value={this.state.dataSetId}
                        fullWidth
                        onChange={this.onSelectDataSet}
                        hintText={this.getTranslation('please_select_a_data_set')}
                    />
                </div>
                {this.state.dataSetId &&
                    <ListSelect
                        onItemDoubleClick={this.onDoubleClickReportingRate}
                        source={reportingRates}
                        listStyle={styles.listStyle}
                        size={10}
                    />}
            </div>
        );
    }
}


ReportingRatesSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

ReportingRatesSelector.contextTypes = {
    d2: PropTypes.object,
};

export default ReportingRatesSelector;
