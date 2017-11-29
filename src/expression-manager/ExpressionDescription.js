import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField/TextField';

class ExpressionDescription extends Component {
    handleDescriptionChange = (event) => {
        const descriptionValue = event.target.value;
        this.props.onDescriptionChange(descriptionValue);
    };

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
}

ExpressionDescription.propTypes = {
    descriptionLabel: PropTypes.string.isRequired,
    descriptionValue: PropTypes.string.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
};

ExpressionDescription.defaultProps = {
    errorText: '',
};

export default ExpressionDescription;
