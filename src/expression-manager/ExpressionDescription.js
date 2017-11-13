import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField/TextField';

const ExpressionDescription = React.createClass({
    propTypes: {
        descriptionLabel: PropTypes.string,
        descriptionValue: PropTypes.string,
        onDescriptionChange: PropTypes.func.isRequired,
        errorText: PropTypes.string,
    },

    render() {
        const { descriptionLabel, descriptionValue, onDescriptionChange, ...textFieldProps } = this.props;

        return (
            <div className="expression-description">
                <TextField
                    {...textFieldProps}
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
