import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { config } from 'd2/lib/d2';
import log from 'loglevel';
import ListSelect from '../list-select/ListSelect.component';
import Translate from '../i18n/Translate.mixin';
import CircularProgress from '../circular-progress/CircularProgress';
import DropDown from '../form-fields/DropDown.component';

config.i18n.strings.add('please_select_a_program');
config.i18n.strings.add('no_tracked_entity_attributes');
config.i18n.strings.add('no_program_indicators');
config.i18n.strings.add('no_program_data_elements');

class DropDownForSchemaReference extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            options: [],
        };
    }

    componentDidMount() {
        const schema = this.getSchema(); // getSchema returns a d2.schema (modelDefinition object)

        schema.list({ paging: false, fields: 'displayName,id' })
            .then(collection => collection.toArray())
            .then(options => this.setState({ options, isLoading: false }))
            .catch(() => this.setState({ isLoading: false }));
    }

    /**
     * Gets a d2 modelDefinition for the `schema` prop.
     *
     * @returns {ModelDefinition}
     * @throws When the `schema` is not a valid schema on the `d2.models` object.
     */
    getSchema() {
        const d2 = this.context.d2;
        const isSchemaAvailable = () => this.props.schema && d2.models[this.props.schema];

        if (isSchemaAvailable()) {
            return d2.models[this.props.schema];
        }

        throw new Error(`${this.props.schema} is not a valid schema name on the d2.models object. Perhaps you forgot to load the schema or the schema does not exist.`);
    }

    render() {
        const { schema, ...selectProps } = this.props;

        if (this.isLoading) {
            return (
                <CircularProgress />
            );
        }

        return (
            <DropDown
                menuItems={this.state.options}
                {...selectProps}
            />
        );
    }
}

DropDownForSchemaReference.propTypes = {
    schema: PropTypes.string.isRequired,
};

DropDownForSchemaReference.contextTypes = {
    d2: PropTypes.object,
};

class ProgramOperandSelector extends Component {
    mixins = [Translate];

    getInitialState() {
        return {
            programTrackedEntityAttributeOptions: [],
            programIndicatorOptions: [],
            programDataElementOptions: [],
            programMenuItems: [],
        };
    }

    componentDidMount() {
        this.context.d2.models.program.list({ paging: false, fields: 'id,displayName,programTrackedEntityAttributes[id,displayName,dimensionItem],programIndicators[id,displayName,dimensionItem]' })
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
                        Array.from(program.programTrackedEntityAttributes.values())
                            .map(tea => ({
                                value: tea.dimensionItem,
                                label: tea.displayName,
                            }))
                            .sort((left, right) => left.label.toLowerCase().localeCompare(right.label.toLowerCase())),
                    ])),
                    programIndicators: new Map(programs.map(program => [
                        program.id,
                        Array.from(program.programIndicators.values())
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

    renderTabs() {
        const listStyle = { width: '100%', outline: 'none', border: 'none', padding: '0rem 1rem' };
        const noValueMessageStyle = {
            padding: '1rem',
        };

        return (
            <Tabs tabItemContainerStyle={{ backgroundColor: '#FFF' }}>
                <Tab label={this.getTranslation('program_data_elements')} style={{ color: '#333' }}>
                    {!this.state.programDataElementOptions.length ? <div style={noValueMessageStyle}>{this.getTranslation('no_program_data_elements')}</div> :
                        <ListSelect
                        onItemDoubleClick={this._programDataElementSelected}
                        source={this.state.programDataElementOptions}
                        listStyle={listStyle}
                        size={10}
                    />}
                </Tab>
                <Tab label={this.getTranslation('program_tracked_entity_attributes')} style={{ color: '#333' }}>
                    {!this.state.programTrackedEntityAttributeOptions.length ? <div style={noValueMessageStyle}>{this.getTranslation('no_tracked_entity_attributes')}</div> :
                    <ListSelect
                            onItemDoubleClick={this._programTrackedEntityAttributeSelected}
                            source={this.state.programTrackedEntityAttributeOptions}
                            listStyle={listStyle}
                            size={10}
                        />}
                </Tab>
                <Tab label={this.getTranslation('program_indicators')} style={{ color: '#333' }}>
                    {!this.state.programIndicatorOptions.length ? <div style={noValueMessageStyle}>{this.getTranslation('no_program_indicators')}</div> :
                    <ListSelect
                            onItemDoubleClick={this._programIndicatorSelected}
                            source={this.state.programIndicatorOptions}
                            listStyle={listStyle}
                            size={10}
                        />}
                </Tab>
            </Tabs>
        );
    }

    render() {
        return (
            <div>
                <div style={{ margin: '0 1rem' }}>
                    <DropDownForSchemaReference
                        schema="program"
                        value={this.state.selectedProgram}
                        fullWidth
                        onChange={this._loadProgramDataOperands}
                        hintText={this.getTranslation('please_select_a_program')}
                    />
                </div>
                {this.state.selectedProgram ? this.renderTabs() : null}
            </div>
        );
    }

    _loadProgramDataOperands(event) {
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

    _programTrackedEntityAttributeSelected(value) {
        const programTrackedEntityAttributeFormula = ['A{', value, '}'].join('');

        this.props.programOperandSelected(programTrackedEntityAttributeFormula);
    }

    _programIndicatorSelected(value) {
        const programIndicatorFormula = ['I{', value, '}'].join('');

        this.props.programOperandSelected(programIndicatorFormula);
    }

    _programDataElementSelected(value) {
        const programDataElementSelected = ['D{', value, '}'].join('');

        this.props.programOperandSelected(programDataElementSelected);
    }
}

ProgramOperandSelector.propTypes = {
    programOperandSelected: PropTypes.func.isRequired,
};

export default ProgramOperandSelector;
