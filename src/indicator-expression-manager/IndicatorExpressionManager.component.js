import React from 'react';
import ExpressionDescription from './ExpressionDescription.component';
import ExpressionOperators from './ExpressionOperators.component';
import ExpressionFormula from './ExpressionFormula.component';
import ListSelect from '../list-select/ListSelect.component';
import DataElementOperandSelector from './DataElementOperandSelector.component';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const IndicatorExpressionManager = React.createClass({
    propTypes: {
        descriptionLabel: React.PropTypes.string.isRequired,
        organisationUnitGroupOptions: React.PropTypes.array.isRequired,
        constantOptions: React.PropTypes.array.isRequired,
        dataElementOperandModelDefinition: React.PropTypes.object.isRequired,
    },

    getDefaultProps() {
        return {
            organisationUnitGroupOptions: [],
            constantOptions: [],
        };
    },

    getInitialState() {
        return {
            formula: '',
            description: '',
        };
    },

    render() {
        return (
            <div className="indicator-expression-manager">
                <ExpressionDescription descriptionLabel={this.i18n.description} onDescriptionChange={this.descriptionChange}/>
                <ExpressionFormula onFormulaChange={this.formulaChange} formula={this.state.formula} />
                <ExpressionOperators operatorClicked={this.addOperatorToFormula}  />
                <Tabs>
                    <Tab label={this.i18n.constants}>
                        <ListSelect onItemDoubleClick={this.constantSelected} source={this.props.constantOptions} />
                    </Tab>
                    <Tab label={this.i18n.organisationUnitCounts}>
                        <ListSelect onItemDoubleClick={this.organisationUnitGroupSelected} source={this.props.organisationUnitGroupOptions} />
                    </Tab>
                    <Tab label={this.i18n.dataElements}>
                        <DataElementOperandSelector onItemDoubleClick={this.dataElementOperandSelected} dataElementOperandModelDefinition={this.props.dataElementOperandModelDefinition} />
                    </Tab>
                </Tabs>
            </div>
        );
    },

    i18n: {
        description: 'Description',
        constants: 'Constants',
        organisationUnitCounts: 'Organisation unit counts',
        dataElements: 'Data elements',
    },

    descriptionChange(newDescription) {
        this.setState({
            description: newDescription,
        });
    },

    formulaChange(newFormula) {
        this.setState({
            formula: newFormula,
        });
    },

    addOperatorToFormula(operator) {
        this.appendToFormula(operator);
    },

    organisationUnitGroupSelected(value) {
        const ougFormula = ['OUG{', value, '}'].join('');

        this.appendToFormula(ougFormula);
    },

    constantSelected(value) {
        const constFormula = ['C{', value, '}'].join('');

        this.appendToFormula(constFormula);
    },

    appendToFormula(partToAppend) {
        this.setState({
            formula: [this.state.formula, partToAppend].join(''),
        });
    },

    dataElementOperandSelected(dataElementOperandId) {
        const dataElementOperandFormula = ['#{', dataElementOperandId, '}'].join('');

        this.appendToFormula(dataElementOperandFormula);
    },
});

export default IndicatorExpressionManager;
