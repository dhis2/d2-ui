import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField/TextField';

class ExpressionDescription extends Component {
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
    }

    handleDescriptionChange(event) {
        const descriptionValue = event.target.value;
        this.props.onDescriptionChange(descriptionValue);
    }
}

ExpressionDescription.propTypes = {
    descriptionLabel: PropTypes.string,
    descriptionValue: PropTypes.string,
    onDescriptionChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
};

export default ExpressionDescription;
