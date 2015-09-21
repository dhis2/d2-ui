import React from 'react';
import classes from 'classnames';

const emptyComponent = class extends React.Component { render() { return null; }};

/**
 * Is required to be a direct child of the `Form.component`
 * Will receive a updateFormStatus method from the Form to be called when the state of the input changes.
 * This will be passed down as an onChange event.
 * If the component passed as `type` does not support onChange
 * consider passing a wrapper component that wraps your `type` component
 * and fires the onChange
 */
const FormField = React.createClass({
    propTypes: {
        type: React.PropTypes.element.isRequired,
        isValid: React.PropTypes.bool.isRequired,
        errorMessage: React.PropTypes.string,
        fieldOptions: React.PropTypes.object.isRequired,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps() {
        return {
            type: emptyComponent,
            validators: [],
        };
    },

    render() {
        const classList = classes('form-field');

        return (
            <div className={classList}>
                <this.props.type
                    {...this.props.fieldOptions}
                    errorText={this.props.errorMessage}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        );
    },
});

export default FormField;
