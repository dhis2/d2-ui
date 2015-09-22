import React from 'react';
import classes from 'classnames';
import FlatButton from 'material-ui/lib/flat-button';

const ExpressionOperators = React.createClass({
    propTypes: {
        operatorClicked: React.PropTypes.func.isRequired,
    },

    render() {
        const classList = classes('expression-operators');

        return (
            <div className={classList}>
                <FlatButton onClick={this.createOperatorClick('(')}>(</FlatButton>
                <FlatButton onClick={this.createOperatorClick(')')}>)</FlatButton>
                <FlatButton onClick={this.createOperatorClick(' * ')}>*</FlatButton>
                <FlatButton onClick={this.createOperatorClick(' / ')}>/</FlatButton>
                <FlatButton onClick={this.createOperatorClick(' + ')}>+</FlatButton>
                <FlatButton onClick={this.createOperatorClick(' - ')}>-</FlatButton>
                <FlatButton onClick={this.createOperatorClick(' [days] ')}>Days</FlatButton>
            </div>
        );
    },

    createOperatorClick(operatorValue) {
        return function operatorButtonClick() {
            this.props.operatorClicked(operatorValue);
        }.bind(this);
    },
});

export default ExpressionOperators;
