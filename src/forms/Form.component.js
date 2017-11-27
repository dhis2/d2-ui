import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import FormField from './FormField.component';
import Translate from '../i18n/Translate.mixin';
import { FormFieldStatuses, createFormValidator } from './FormValidator';


const Form = React.createClass({
    propTypes: {
        fieldConfigs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.func.isRequired,
                fieldOptions: PropTypes.object,
                validators: PropTypes.arrayOf(PropTypes.func),
            }),
        ).isRequired,
        formValidator: PropTypes.object,
        onFormFieldUpdate: PropTypes.func,
        source: PropTypes.object.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            fieldConfigs: [],
            formValidator: createFormValidator([]),
        };
    },

    componentDidMount() {
        this.disposables = [];
        this.disposables.push(this.props.formValidator.status.subscribe(() => {
            // TODO: Should probably have some sort of check to see if it really needs to update? That update might be better at home in the formValidator however
            this.forceUpdate();
        }));
    },

    componentWillReceiveProps(props) {
        if (props.hasOwnProperty('formValidator')) {
            this.forceUpdate();
        }
    },

    componentWillUnmount() {
        this.disposables.forEach((d) => {
            d.unsubscribe();
        });
    },

    renderFieldsFromFieldConfigs() {
        return this.props.fieldConfigs
            .filter(fieldConfig => fieldConfig.type)
            .map((fieldConfig) => {
                const fieldValue = this.props.source && this.props.source[fieldConfig.name];
                const updateEvent = fieldConfig.updateEvent === 'onBlur' ? 'onBlur' : 'onChange';
                const validationStatus = this.props.formValidator.getStatusFor(fieldConfig.name);
                let errorMessage;

                if (validationStatus && validationStatus.messages && validationStatus.messages.length) {
                    errorMessage = validationStatus.messages[0];
                }

                return (
                    <FormField
                        fieldOptions={fieldConfig.fieldOptions}
                        key={fieldConfig.name}
                        type={fieldConfig.type}
                        isRequired={fieldConfig.required}
                        isValidating={validationStatus.status === FormFieldStatuses.VALIDATING}
                        errorMessage={errorMessage ? this.getTranslation(errorMessage) : undefined}
                        onChange={this.updateRequest.bind(this, fieldConfig)}
                        value={fieldValue}
                        isValid={this.isValid()}
                        updateFn={this.updateRequest.bind(this, fieldConfig)}
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
        this.props.formValidator.runFor(fieldConfig.name, event.target.value, this.props.source);
        this.props.onFormFieldUpdate && this.props.onFormFieldUpdate(
            fieldConfig.name, fieldConfig.beforeUpdateConverter ?
                fieldConfig.beforeUpdateConverter(event.target.value, fieldConfig) :
                event.target.value,
        );
    },
});

export default Form;
