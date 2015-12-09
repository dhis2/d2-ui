import React from 'react';
import TextField from 'material-ui/lib/text-field';

const ExpressionFormula = React.createClass({
    propTypes: {
        onFormulaChange: React.PropTypes.func.isRequired,
        formula: React.PropTypes.string,
    },

    render() {
        return (
            <div className="expression-formula">
                <TextField multiLine
                           onChange={this.handleFomulaChange}
                           value={this.props.formula}
                           fullWidth
                    />
            </div>
        );
    },

    handleFomulaChange(event) {
        const formulaValue = event.target.value;

        if (this.props.onFormulaChange) {
            this.props.onFormulaChange(formulaValue);
        }
    },
});

export default ExpressionFormula;
