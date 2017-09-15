import React from 'react';
import { isObject } from 'lodash';
import AsyncValidatorRunner from './AsyncValidatorRunner';

import CircularProgres from '../circular-progress/CircularProgress';

const noop = () => {};

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState(props);
        this.asyncValidators = this.createAsyncValidators(props);
        this.asyncValidationRunner = props.asyncValidationRunner || new AsyncValidatorRunner();

        this.getFieldProp = this.getFieldProp.bind(this);
        this.getStateClone = this.getStateClone.bind(this);
    }


    /**
     * Called by React when the component receives new props, but not on the initial render.
     *
     * State is calculated based on the incoming props, in such a way that existing form fields
     * are updated as necessary, but not overridden. See the initState function for details.
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        this.asyncValidators = this.createAsyncValidators(props);

        const clonedState = this.getStateClone();

        props.fields
            // Only check fields that are set on the component state
            .filter(field => this.state && this.state.fields && this.state.fields[field.name])
            // Filter out fields where the values changed
            .filter(field => field.value !== this.state.fields[field.name].value)
            // Change field value and run validators for the field
            .forEach((field) => {
                clonedState.fields[field.name].value = field.value;
                this.validateField(clonedState, field.name, field.value);
            });

        this.setState(clonedState);
    }


    /**
     * Custom state deep copy function
     *
     * @returns {{form: {pristine: (boolean), valid: (boolean), validating: (boolean)}, fields: *}}
     */
    getStateClone() {
        return {
            form: {
                pristine: this.state.form.pristine,
                valid: this.state.form.valid,
                validating: this.state.form.validating,
            },
            fields: Object.keys(this.state.fields).reduce((p, c) => {
                p[c] = {
                    pristine: this.state.fields[c].pristine,
                    validating: this.state.fields[c].validating,
                    valid: this.state.fields[c].valid,
                    value: this.state.fields[c].value,
                    error: this.state.fields[c].error,
                };
                return p;
            }, {}),
        };
    }


    /**
     * Render the form fields.
     *
     * @returns {*} An array containing markup for each form field
     */
    renderFields() {
        const styles = {
            field: {
                position: 'relative',
            },
            progress: this.props.validatingProgressStyle,
            validatingErrorStyle: {
                color: 'orange',
            },
        };

        return this.props.fields.map((field) => {
            const { errorTextProp, ...props } = field.props || {};
            const fieldState = this.state.fields[field.name] || {};

            const changeHandler = this.handleFieldChange.bind(this, field.name);

            const onBlurChangeHandler = props.changeEvent === 'onBlur' ?
                (e) => {
                    const stateClone = this.updateFieldState(this.getStateClone(), field.name, { value: e.target.value });
                    this.validateField(stateClone, field.name, e.target.value);
                    this.setState(stateClone);
                } :
                undefined;

            const errorText = fieldState && fieldState.validating
                ? field.validatingLabelText || this.props.validatingLabelText
                : errorTextProp;

            return (
                <div key={field.name} style={Object.assign({}, styles.field, this.props.fieldWrapStyle)}>
                    {fieldState.validating ? (
                        <CircularProgres mode="indeterminate" size={0.33} style={styles.progress} />
                    ) : undefined}
                    <field.component
                        value={fieldState.value}
                        onChange={props.changeEvent && props.changeEvent === 'onBlur' ? onBlurChangeHandler : changeHandler}
                        onBlur={props.changeEvent && props.changeEvent === 'onBlur' ? changeHandler : undefined}
                        errorStyle={fieldState.validating ? styles.validatingErrorStyle : undefined}
                        errorText={fieldState.valid ? errorText : fieldState.error}
                        {...props}
                    />
                </div>
            );
        });
    }


    /**
     * Render the component
     *
     * @returns {XML}
     */
    render() {
        return (
            <div style={this.props.style}>
                {this.renderFields()}
            </div>
        );
    }


    /**
     * Calculates initial state based on the provided props and the existing state, if any.
     *
     * @param props
     * @returns {{form: {pristine: (boolean), valid: (boolean), validating: (boolean)}, fields: *}}
     */
    initState(props) {
        const state = {
            fields: props.fields.reduce((fields, field) => {
                const currentFieldState = this.state && this.state.fields && this.state.fields[field.name];
                return Object.assign(fields, {
                    [field.name]: {
                        value: currentFieldState !== undefined && !currentFieldState.pristine
                            ? currentFieldState.value
                            : field.value,
                        pristine: currentFieldState !== undefined
                            ? currentFieldState.value === field.value
                            : true,
                        validating: currentFieldState !== undefined ? currentFieldState.validating : false,
                        valid: currentFieldState !== undefined ? currentFieldState.valid : true,
                        error: currentFieldState && currentFieldState.error || undefined,
                    },
                });
            }, {}),
        };
        state.form = {
            pristine: Object.keys(state.fields).reduce((p, c) => p && state.fields[c].pristine, true),
            validating: Object.keys(state.fields).reduce((p, c) => p || state.fields[c].validating, false),
            valid: Object.keys(state.fields).reduce((p, c) => p && state.fields[c].valid, true),
        };
        return state;
    }


    /**
     * Create an object with a property for each field that has async validators, which is later used
     * to store Rx.Observable's for any currently running async validators
     *
     * @param props
     * @returns {*}
     */
    createAsyncValidators(props) {
        return props.fields
            .filter(field => Array.isArray(field.asyncValidators) && field.asyncValidators.length)
            .reduce((p, currentField) => {
                p[currentField.name] = (this.asyncValidators && this.asyncValidators[currentField.name]) || undefined;
                return p;
            }, {});
    }


    /**
     * Cancel the currently running async validators for the specified field name, if any.
     *
     * @param fieldName
     */
    cancelAsyncValidators(fieldName) {
        if (this.asyncValidators[fieldName]) {
            this.asyncValidators[fieldName].unsubscribe();
            this.asyncValidators[fieldName] = undefined;
        }
    }


    /**
     * Utility method to mutate the provided state object in place
     *
     * @param state A state object
     * @param fieldName A valid field name
     * @param fieldState Mutations to apply to the specified field name
     * @returns {*} A reference to the mutated state object for chaining
     */
    updateFieldState(state, fieldName, fieldState) {
        const fieldProp = this.getFieldProp(fieldName);
        state.fields[fieldName] = {
            pristine: fieldState.pristine !== undefined
                ? !!fieldState.pristine
                : state.fields[fieldName].value === fieldProp.value,
            validating: fieldState.validating !== undefined ? !!fieldState.validating : state.fields[fieldName].validating,
            valid: fieldState.valid !== undefined ? !!fieldState.valid : state.fields[fieldName].valid,
            error: fieldState.error,
            value: fieldState.value !== undefined ? fieldState.value : state.fields[fieldName].value,
        };

        // Form state is a composite of field states
        const fieldNames = Object.keys(state.fields);
        state.form = {
            pristine: fieldNames.reduce((p, current) => p && state.fields[current].pristine, true),
            validating: fieldNames.reduce((p, current) => p || state.fields[current].validating, false),
            valid: fieldNames.reduce((p, current) => p && state.fields[current].valid, true),
        };

        return state;
    }


    /**
     * Field value change event
     *
     * This is called whenever the value of the specified field has changed. This will be the onChange event handler, unless
     * the changeEvent prop for this field is set to 'onBlur'.
     *
     * The change event is processed as follows:
     *
     * - If the value hasn't actually changed, processing stops
     * - The field status is set to [not pristine]
     * - Any currently running async validators are cancelled
     *
     * - All synchronous validators are called in the order specified
     * - If a validator fails:
     *    - The field status is set to invalid
     *    - The field error message is set to the error message for the validator that failed
     *    - Processing stops
     *
     * - If all synchronous validators pass:
     *    - The field status is set to [valid]
     *    - If there are NO async validators for the field:
     *       - The onUpdateField callback is called, and processing is finished
     *
     * - If there ARE async validators for the field:
     *    - All async validators are started immediately
     *    - The field status is set to [valid, validating]
     *    - The validators keep running asynchronously, but the handleFieldChange function terminates
     *
     * - The async validators keep running in the background until ONE of them fail, or ALL of them succeed:
     * - The first async validator to fail causes all processing to stop:
     *    - The field status is set to [invalid, not validating]
     *    - The field error message is set to the value that the validator rejected with
     * - If all async validators complete successfully:
     *    - The field status is set to [valid, not validating]
     *    - The onUpdateField callback is called
     *
     * @param fieldName The name of the field that changed.
     * @param event An event object. Only `event.target.value` is used.
     */
    handleFieldChange(fieldName, event) {
        const newValue = event.target.value;

        const field = this.getFieldProp(fieldName);

        // If the field has changeEvent=onBlur the change handler is triggered whenever the field loses focus.
        // So if the value didn't actually change, abort the change handler here.
        if (field.props && field.props.changeEvent === 'onBlur' && newValue === field.value) {
            return;
        }

        // Using custom clone function to maximize speed, albeit more error prone
        const stateClone = this.getStateClone();

        // Update value, and set pristine to false
        this.setState(this.updateFieldState(stateClone, fieldName, { pristine: false, value: newValue }),
            () => {
                if (!isObject(newValue) && newValue === (field.value ? field.value : '')) {
                    this.props.onUpdateField(fieldName, newValue);
                    return;
                }

                // Cancel async validators in progress (if any)
                if (this.asyncValidators[fieldName]) {
                    this.cancelAsyncValidators(fieldName);
                    this.setState(this.updateFieldState(stateClone, fieldName, { validating: false }));
                }

                // Run synchronous validators
                const validatorResult = this.validateField(stateClone, fieldName, newValue);

                // Async validators - only run if sync validators pass
                if (validatorResult === true) {
                    this.runAsyncValidators(field, stateClone, fieldName, newValue);
                } else {
                    // Sync validators failed set field status to false
                    this.setState(this.updateFieldState(stateClone, fieldName, { valid: false, error: validatorResult }), () => {
                        // Also emit when the validator result is false
                        this.props.onUpdateFormStatus(this.state.form);
                        this.props.onUpdateField(fieldName, newValue);
                    });
                }
            });
    }

    runAsyncValidators(field, stateClone, fieldName, newValue) {
        if ((field.asyncValidators || []).length > 0) {
            // Set field and form state to 'validating'
            this.setState(this.updateFieldState(stateClone, fieldName, { validating: true }),
                () => {
                    this.props.onUpdateFormStatus(this.state.form);
                    this.props.onUpdateField(fieldName, newValue);

                    // TODO: Subscription to validation results could be done once in `componentDidMount` and be
                    // disposed in the `componentWillUnmount` method. This way we don't have to create the
                    // subscription every time the field is changed.
                    this.asyncValidators[fieldName] = this.asyncValidationRunner
                        .listenToValidatorsFor(fieldName)
                        .subscribe(
                            (status) => {
                                this.setState(
                                    this.updateFieldState(
                                        this.getStateClone(), status.fieldName, {
                                            validating: false,
                                            valid: status.isValid,
                                            error: status.message,
                                        },
                                    ), () => {
                                        this.cancelAsyncValidators(status.fieldName);
                                        this.props.onUpdateFormStatus(this.state.form);
                                    },
                                );
                            },
                        );

                    this.asyncValidationRunner.run(fieldName, field.asyncValidators, newValue);
                });
        } else {
            this.setState(this.updateFieldState(stateClone, fieldName, { valid: true }), () => {
                this.props.onUpdateFormStatus(this.state.form);
                this.props.onUpdateField(fieldName, newValue);
            });
        }
    }


    /**
     * Run all synchronous validators (if any) for the field and value, and update the state clone depending on the
     * outcome
     *
     * @param stateClone A clone of the current state
     * @param fieldName The name of the field to validate
     * @param newValue The value to validate
     * @returns {true|String} The error message from the first validator that fails, or true if they all pass
     */
    validateField(stateClone, fieldName, newValue) {
        const field = this.getFieldProp(fieldName);

        const validatorResult = (field.validators || [])
            .reduce((pass, currentValidator) => (pass === true
                ? (currentValidator.validator(newValue) === true || currentValidator.message) : pass
            ), true);

        this.updateFieldState(stateClone, fieldName, {
            valid: validatorResult === true,
            error: validatorResult === true ? undefined : validatorResult,
        });

        return validatorResult;
    }


    /**
     * Retreive the field that has the specified field name
     *
     * @param fieldName
     * @returns {}
     */
    getFieldProp(fieldName) {
        return this.props.fields.filter(f => f.name === fieldName)[0];
    }
}


/**
 * Component prop types
 * @type {{fields: (Object|isRequired), validatingLabelText: *, validatingProgressStyle: *, onUpdateField: (Function|isRequired)}}
 */
FormBuilder.propTypes = {
    fields: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.any,
        component: React.PropTypes.func.isRequired,
        props: React.PropTypes.shape({
            changeEvent: React.PropTypes.oneOf(['onChange', 'onBlur']),
        }),
        validators: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                validator: React.PropTypes.func.isRequired,
                message: React.PropTypes.string.isRequired,
            }),
        ),
        asyncValidators: React.PropTypes.arrayOf(React.PropTypes.func.isRequired),
        validatingLabelText: React.PropTypes.string,
    })).isRequired,
    validatingLabelText: React.PropTypes.string,
    validatingProgressStyle: React.PropTypes.object,
    onUpdateField: React.PropTypes.func.isRequired,
    onUpdateFormStatus: React.PropTypes.func,
    style: React.PropTypes.object,
    fieldWrapStyle: React.PropTypes.object,
};


/**
 * Default values for optional props
 * @type {{validatingLabelText: string, validatingProgressStyle: {position: string, right: number, top: number}}}
 */
FormBuilder.defaultProps = {
    validatingLabelText: 'Validating...',
    validatingProgressStyle: {
        position: 'absolute',
        right: -12,
        top: 16,
    },
    onUpdateFormStatus: noop,
};

export default FormBuilder;
