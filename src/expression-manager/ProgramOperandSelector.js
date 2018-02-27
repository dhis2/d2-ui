import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { config } from 'd2/lib/d2';

import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

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
    tabLabel: {
        color: '#333',
    },
    tabItemContainerStyle: {
        backgroundColor: '#FFF',
    },
    dropDownStyle: {
        margin: '0 1rem',
    },
};

class ProgramOperandSelector extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    state = {
        programTrackedEntityAttributeOptions: [],
        programIndicatorOptions: [],
        programDataElementOptions: [],
        programMenuItems: [],
    };

    componentDidMount() {
        this.context.d2.models.program.list({ paging: false, fields: 'id,displayName,programTrackedEntityAttributes[id,displayName,trackedEntityAttribute],programIndicators[id,displayName,dimensionItem]' })
            .then(programCollection => programCollection.toArray())
            .then((programs) => {
                const programMenuItems = programs
                    .map(program => ({
                        payload: program.id,
                        text: program.displayName,
                    }))
                    .sort((left, right) => left.text.localeCompare(right.text.toLowerCase()));
                
                this.setState({
                    programMenuItems,
                    programAttributes: new Map(programs.map(program => [
                        program.id,
                        program.programTrackedEntityAttributes
                            .map(ptea => ({
                                value: ptea.trackedEntityAttribute.id,
                                label: ptea.displayName,
                            }))
                            .sort((left, right) => left.label.toLowerCase().localeCompare(right.label.toLowerCase())),
                    ])),
                    programIndicators: new Map(programs.map(program => [
                        program.id,
                        Array.from(program.programIndicators.values
                            ? program.programIndicators.values()
                            : [])
                            .map(pi => ({
                                value: pi.dimensionItem,
                                label: pi.displayName,
                            }))
                            .sort((left, right) => left.label.toLowerCase().localeCompare(right.label.toLowerCase())),
                    ])),
                });
            })
            .catch(e => log.error(e));
    }

    onLoadProgramDataOperands = (event) => {
        const api = this.context.d2.Api.getApi();
        const programId = event.target.value;

        api.get('programDataElements', { program: programId, fields: 'id,displayName,dimensionItem', paging: false, order: 'displayName:asc' })
            .then((programDataElements) => {
                this.setState({
                    selectedProgram: programId,
                    programDataElementOptions: programDataElements.programDataElements
                        .map(programDataElement => ({ value: programDataElement.dimensionItem, label: programDataElement.displayName })),
                    programIndicatorOptions: this.state.programIndicators.get(programId) || [],
                    programTrackedEntityAttributeOptions: this.state.programAttributes.get(programId) || [],
                });
            })
            .catch(error => log.error(error));
    }

    onProgramTrackedEntityAttributeSelected = (value) => {
        const programTrackedEntityAttributeFormula = ['A{', this.state.selectedProgram, '.', value, '}'].join('');
        this.props.onSelect(programTrackedEntityAttributeFormula);
    }

    onProgramIndicatorSelected = (value) => {
        const programIndicatorFormula = ['I{', value, '}'].join('');

        this.props.onSelect(programIndicatorFormula);
    }

    onProgramDataElementSelected = (value) => {
        const programDataElementSelected = ['D{', value, '}'].join('');

        this.props.onSelect(programDataElementSelected);
    }

    renderTab(tabName, source, onItemDoubleClick, noValueMessage, listLength) {
        return (
            <Tab label={this.getTranslation(tabName)} style={styles.tabLabel}>
                {!listLength
                    ? <div style={styles.noValueMessageStyle}>{this.getTranslation(noValueMessage)}</div>
                    : <ListSelect
                        onItemDoubleClick={onItemDoubleClick}
                        source={source}
                        listStyle={styles.listStyle}
                        size={10}
                    />}
            </Tab>
        );
    }

    renderTabs() {
        return (
            <Tabs tabItemContainerStyle={styles.tabItemContainerStyle}>
                {this.renderTab('program_data_elements',
                    this.state.programDataElementOptions,
                    this.onProgramDataElementSelected,
                    'no_program_data_elements',
                    this.state.programDataElementOptions.length)}

                {this.renderTab('program_tracked_entity_attributes',
                    this.state.programTrackedEntityAttributeOptions,
                    this.onProgramTrackedEntityAttributeSelected,
                    'no_tracked_entity_attributes',
                    this.state.programTrackedEntityAttributeOptions.length)}

                {this.renderTab('program_indicators',
                    this.state.programIndicatorOptions,
                    this.onProgramIndicatorSelected,
                    'no_program_indicators',
                    this.state.programIndicatorOptions.length)}
            </Tabs>
        );
    }

    render() {
        return (
            <div>
                <div style={styles.dropDownStyle}>
                    <DropDownForSchemaReference
                        schema="program"
                        value={this.state.selectedProgram}
                        fullWidth
                        onChange={this.onLoadProgramDataOperands}
                        hintText={this.getTranslation('please_select_a_program')}
                    />
                </div>
                {this.state.selectedProgram ? this.renderTabs() : null}
            </div>
        );
    }
}

ProgramOperandSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

ProgramOperandSelector.contextTypes = {
    d2: PropTypes.object,
};

export default ProgramOperandSelector;
