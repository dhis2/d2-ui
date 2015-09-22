import React from 'react';
import TextField from 'material-ui/lib/text-field';

const ExpressionDescription = React.createClass({
    propTypes: {
        descriptionLabel: React.PropTypes.string,
        onDescriptionChange: React.PropTypes.func.isRequired,
    },

    render() {
        return (
            <div className="expression-description">
                <TextField
                    floatingLabelText={this.props.descriptionLabel}
                    onChange={this.handleDescriptionChange}
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
