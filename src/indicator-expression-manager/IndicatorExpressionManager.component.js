import React from 'react';
import ExpressionDescription from './ExpressionDescription.component';
import ExpressionOperators from './ExpressionOperators.component';
import ExpressionFormula from './ExpressionFormula.component';
import ListSelect from '../list-select/ListSelect.component';

const IndicatorExpressionManager = React.createClass({
    propTypes: {
        descriptionLabel: React.PropTypes.string.isRequired,
        organisationUnitGroupOptions: React.PropTypes.array.isRequired,
        constantOptions: React.PropTypes.array.isRequired,
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
                <ListSelect onItemDoubleClick={this.organisationUnitGroupSelected} source={this.props.organisationUnitGroupOptions} />
                <ListSelect onItemDoubleClick={this.constantSelected} source={this.props.constantOptions} />
            </div>
        );
    },

    i18n: {
        description: 'Description',
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
});

export default IndicatorExpressionManager;
