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
        type: React.PropTypes.func.isRequired,
        isValid: React.PropTypes.bool.isRequired,
        errorMessage: React.PropTypes.string,
        fieldOptions: React.PropTypes.object.isRequired,
        value: React.PropTypes.any,
        updateFn: React.PropTypes.func.isRequired,
        updateEvent: React.PropTypes.oneOf(['onChange', 'onBlur']),
    },

    getDefaultProps() {
        return {
            type: emptyComponent,
            validators: [],
        };
    },


    renderHelpText() {
        const helpStyle = {
            color: '#888',
            fontSize: '.75rem',
        };

        if (this.props.fieldOptions && this.props.fieldOptions.helpText) {
            return (
                <div style={helpStyle}>{this.props.fieldOptions.helpText}</div>
            );
        }
        return null;
    },

    render() {
        const classList = classes('form-field');

        let onChangeFn = this.props.updateFn;
        let onBlurFn = undefined;
        if (this.props.updateEvent === 'onBlur') {
            onBlurFn = (e) => {
                if (e.target.value !== this.props.value) {
                    this.props.updateFn(e);
                }
            };
            onChangeFn = undefined;
        }

        return (
            <div className={classList}>
                <this.props.type
                    errorText={this.props.errorMessage}
                    defaultValue={this.props.value}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                    {...this.props.fieldOptions}
                />
                {this.renderHelpText()}
            </div>
        );
    },
});

export default FormField;
