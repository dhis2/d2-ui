import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import ListSelect from '../list-select/ListSelect.component';
import SelectField from 'material-ui/lib/select-field';
import { config } from 'd2/lib/d2';
import Translate from '../i18n/Translate.mixin';
import log from 'loglevel';

config.i18n.strings.add('please_select_a_program');
config.i18n.strings.add('no_tracked_entity_attributes');
config.i18n.strings.add('no_program_indicators');
config.i18n.strings.add('no_program_data_elements');

export default React.createClass({
    propTypes: {
        programOperandSelected: React.PropTypes.func.isRequired,
    },

    mixins: [Translate],

    getInitialState() {
        return {
            programTrackedEntityAttributeOptions: [],
            programIndicatorOptions: [],
            programDataElementOptions: [],
            programMenuItems: [],
        };
    },

    componentDidMount() {
        this.context.d2.models.program.list({ paging: false, fields: 'id,displayName,programTrackedEntityAttributes[id,displayName,dimensionItem],programIndicators[id,displayName,dimensionItem]' })
            .then(programCollection => programCollection.toArray())
            .then(programs => {
                const programMenuItems = programs
                    .map(program => {
                        return {
                            payload: program.id,
                            text: program.displayName,
                        };
                    });

                this.setState({
                    programMenuItems,
                    programAttributes: new Map(programs.map(program => {
                        return [
                            program.id,
                            Array.from(program.programTrackedEntityAttributes.values())
                                .map(tea => {
                                    return {
                                        value: tea.dimensionItem,
                                        label: tea.displayName,
                                    };
                                }),
                        ];
                    })),
                    programIndicators: new Map(programs.map(program => {
                        return [
                            program.id,
                            Array.from(program.programIndicators.values())
                                .map(pi => {
                                    return {
                                        value: pi.dimensionItem,
                                        label: pi.displayName,
                                    };
                                }),
                        ];
                    })),
                });
            })
            .catch(e => log.error(e));
    },

    renderTabs() {
        const listStyle = { width: '100%', outline: 'none', border: 'none', padding: '0rem 1rem' };
        const noValueMessageStyle = {
            padding: '1rem',
        };

        return (
            <Tabs tabItemContainerStyle={{ backgroundColor: '#FFF' }}>
                <Tab label={this.getTranslation('program_data_elements')} style={{ color: '#333' }}>
                    {!this.state.programDataElementOptions.length ? <div style={noValueMessageStyle}>{this.getTranslation('no_program_data_elements')}</div> :
                        <ListSelect onItemDoubleClick={this._programDataElementSelected}
                                    source={this.state.programDataElementOptions}
                                    listStyle={listStyle}
                                    size="10"
                        />}
                </Tab>
                <Tab label={this.getTranslation('program_tracked_entity_attributes')} style={{ color: '#333' }}>
                    {!this.state.programTrackedEntityAttributeOptions.length ? <div style={noValueMessageStyle}>{this.getTranslation('no_tracked_entity_attributes')}</div> :
                    <ListSelect onItemDoubleClick={this._programTrackedEntityAttributeSelected}
                                source={this.state.programTrackedEntityAttributeOptions}
                                listStyle={listStyle}
                                size="10"
                    />}
                </Tab>
                <Tab label={this.getTranslation('program_indicators')} style={{ color: '#333' }}>
                    {!this.state.programIndicatorOptions.length ? <div style={noValueMessageStyle}>{this.getTranslation('no_program_indicators')}</div> :
                    <ListSelect onItemDoubleClick={this._programIndicatorSelected}
                                source={this.state.programIndicatorOptions}
                                listStyle={listStyle}
                                size="10"
                    />}
                </Tab>
            </Tabs>
        );
    },

    render() {
        return (
            <div>
                <div style={{ margin: '0 1rem' }}>
                    <SelectField menuItems={this.state.programMenuItems}
                                 onChange={this._loadProgramDataOperands}
                                 value={this.state.selectedProgram}
                                 hintText={this.getTranslation('please_select_a_program')}
                                 fullWidth
                    />
                </div>
                {this.state.selectedProgram ? this.renderTabs() : null}
            </div>
        );
    },

    _loadProgramDataOperands(event, index, menuItem) {
        const programId = menuItem.payload;
        const api = this.context.d2.Api.getApi();

        api.get('programDataElements', { program: programId, fields: 'id,displayName,dimensionItem', paging: false })
            .then((programDataElements) => {
                this.setState({
                    selectedProgram: programId,
                    programDataElementOptions: programDataElements.programDataElements
                        .map(programDataElement => {
                            return { value: programDataElement.dimensionItem, label: programDataElement.displayName };
                        }),
                    programIndicatorOptions: this.state.programIndicators.get(programId) || [],
                    programTrackedEntityAttributeOptions: this.state.programAttributes.get(programId) || [],
                });
            })
            .catch(error => log.error(error));
    },

    _programTrackedEntityAttributeSelected(value) {
        const programTrackedEntityAttributeFormula = ['A{', value, '}'].join('');

        this.props.programOperandSelected(programTrackedEntityAttributeFormula);
    },

    _programIndicatorSelected(value) {
        const programIndicatorFormula = ['I{', value, '}'].join('');

        this.props.programOperandSelected(programIndicatorFormula);
    },

    _programDataElementSelected(value) {
        const programDataElementSelected = ['D{', value, '}'].join('');

        this.props.programOperandSelected(programDataElementSelected);
    },
});
