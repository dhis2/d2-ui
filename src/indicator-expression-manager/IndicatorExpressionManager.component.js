import React from 'react';
import classes from 'classnames';
import TextField from 'material-ui/lib/text-field';
import ExpressionOperators from './ExpressionOperators.component';

const IndicatorExpressionManager = React.createClass({
    propTypes: {
        descriptionLabel: React.PropTypes.string.isRequired,
    },

    render() {
        const classList = classes('indicator-expression-manager');

        return (
            <div className={classList}>
                <TextField
                    floatingLabelText={this.props.descriptionLabel}
                    onChange={this._descriptionChange}
                />
                <ExpressionOperators />
            </div>
        );
    },

    _descriptionChange(event) {
        this.setState({
            description: event.target.value.trim(),
        });
    },
});

export default IndicatorExpressionManager;
