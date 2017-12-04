import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class ExpressionOperators extends Component {    
    render() {
        const classList = classes('expression-operators');

        const operatorButtonStyle = {
            minWidth: 50,
        };

        return (
            <div className={classList}>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick('(')}>(</FlatButton>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick(')')}>)</FlatButton>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick(' * ')}>*</FlatButton>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick(' / ')}>/</FlatButton>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick(' + ')}>+</FlatButton>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick(' - ')}>-</FlatButton>
                <FlatButton style={operatorButtonStyle} onClick={this.createOperatorClick(' [days] ')}>Days</FlatButton>
            </div>
        );
    }

    createOperatorClick(operatorValue) {
        return function operatorButtonClick() {
            this.props.operatorClicked(operatorValue);
        }.bind(this);
    }
}

ExpressionOperators.propTypes = {
    operatorClicked: PropTypes.func.isRequired,
};

export default ExpressionOperators;
