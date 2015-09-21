import React from 'react';
import classes from 'classnames';
import FormField from './FormField.component';
import log from 'loglevel';

/**
 *
 */
const Form = React.createClass({
    propTypes: {
        children: React.PropTypes.arrayOf(
            React.PropTypes.element
        ),
        fieldConfigs: React.PropTypes.arrayOf(
            React.PropTypes.shape(FormField.propTypes)
        ),
        onFormFieldUpdate: React.PropTypes.func,
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
                const errorMessage = (fieldConfig.validators || [])
                    .filter(validator => validator() !== true)
                    .map(validator => validator())
                    .shift();

                return (
                    <FormField  fieldOptions={fieldConfig.fieldOptions}
                                key={fieldConfig.name}
                                type={fieldConfig.type}
                                errorMessage={errorMessage}
                                onChange={this.updateRequest.bind(this, fieldConfig)} />
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

    updateRequest(fieldConfig, event, ...args) {
        log.info(`${fieldConfig.name} updated from ${this.props.source[fieldConfig.name]} to ${event.target.value}`);
        this.props.onFormFieldUpdate();
    },
});

export default Form;
