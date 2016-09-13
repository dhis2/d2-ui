import React, { Component, PropTypes } from 'react';

export default class ExpressionFormula extends Component {
    render() {
        const textAreaStyle = {
            margin: 0,
            width: '100%',
            height: 200,
            border: '1px solid #DDD',
            padding: '1rem',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
        };

        return (
            <div className="expression-formula">
                <textarea
                onChange={this._handleFomulaChange}
                value={this.props.formula}
                style={textAreaStyle}
                />
            </div>
        );
    }

    _handleFomulaChange = (event) => {
        const formulaValue = event.target.value;

        if (this.props.onFormulaChange) {
            this.props.onFormulaChange(formulaValue);
        }
    }
}

ExpressionFormula.propTypes = {
    onFormulaChange: PropTypes.func.isRequired,
    formula: PropTypes.string,
};
