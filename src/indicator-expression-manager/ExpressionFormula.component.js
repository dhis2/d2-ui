import React from 'react';

const ExpressionFormula = React.createClass({
    propTypes: {
        onFormulaChange: React.PropTypes.func.isRequired,
        formula: React.PropTypes.string,
    },

    render() {
        const textAreaStyle = {
            margin: 0,
            width: '100%',
            height: 200,
            border: '1px solid #DDD',
            padding: '1rem',
            outline: 'none',
            resize: 'vertical',
        };

        return (
            <div className="expression-formula">
                <textarea
                onChange={this.handleFomulaChange}
                value={this.props.formula}
                style={textAreaStyle}
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
