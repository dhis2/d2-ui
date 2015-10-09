import React from 'react';
import classes from 'classnames';
import FormField from './FormField.component';
// import log from 'loglevel';

/**
 *
 */
const Form = React.createClass({
    propTypes: {
        fieldConfigs: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                type: React.PropTypes.func.isRequired,
                fieldOptions: React.PropTypes.object,
                validators: React.PropTypes.arrayOf(React.PropTypes.func),
            })
        ).isRequired,
        onFormFieldUpdate: React.PropTypes.func,
        source: React.PropTypes.object.isRequired,
        // Silly rule..
        children: React.PropTypes.array,
    },

    getDefaultProps() {
        return {
            fieldConfigs: [],
        };
    },

    renderFieldsFromFieldConfigs() {
        return this.props.fieldConfigs
            .filter(fieldConfig => fieldConfig.type)
            .map(fieldConfig => {
                const fieldValue = this.props.source && this.props.source[fieldConfig.name];
                const errorMessage = (fieldConfig.validators || [])
                    .filter(validator => validator(fieldValue) !== true)
                    .map(validator => validator(fieldValue))
                    .shift();

                const updateFn = this.updateRequest.bind(this, fieldConfig);
                const updateEvent = fieldConfig.updateEvent === 'onBlur' ? 'onBlur' : 'onChange';

                return (
                    <FormField  fieldOptions={fieldConfig.fieldOptions}
                                key={fieldConfig.name}
                                type={fieldConfig.type}
                                errorMessage={errorMessage}
                                value={fieldValue}
                                isValid={this.isValid()}
                                onChange={updateFn}
                                updateEvent={updateEvent}
                        />
                );
            });
    },

    render() {
        const classList = classes('form');

        return (
            <form className={classList}>
                {this.renderFieldsFromFieldConfigs()}
                {this.props.children}
            </form>
        );
    },

    isValid() {
        return true;
    },

    updateRequest(fieldConfig, event) {
        this.props.onFormFieldUpdate && this.props.onFormFieldUpdate(fieldConfig.name, event.target.value);
    },
});

export default Form;
