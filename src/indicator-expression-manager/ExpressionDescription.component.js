import React from 'react';
import TextField from 'material-ui/TextField/TextField';

const ExpressionDescription = React.createClass({
    propTypes: {
        descriptionLabel: React.PropTypes.string,
        descriptionValue: React.PropTypes.string,
        onDescriptionChange: React.PropTypes.func.isRequired,
        errorText: React.PropTypes.string,
    },

    render() {
        return (
            <div className="expression-description">
                <TextField
                    {...this.props}
                    value={this.props.descriptionValue}
                    floatingLabelText={this.props.descriptionLabel}
                    onChange={this.handleDescriptionChange}
                    fullWidth
                    errorText={this.props.errorText}
                    />
            </div>
        );
    },

    handleDescriptionChange(event) {
        const descriptionValue = event.target.value;
        this.props.onDescriptionChange(descriptionValue);
    },
});

export default ExpressionDescription;
