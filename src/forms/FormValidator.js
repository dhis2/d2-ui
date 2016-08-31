import Rx from 'rx';
import log from 'loglevel';
import { isFunction } from 'lodash/fp';

export const FormFieldStatuses = {
    VALID: 'VALID',
    INVALID: 'INVALID',
    VALIDATING: 'VALIDATING',
};

function identity(val) {
    return val;
}

function getAllPromiseValues(promises) {
    return Promise.all(promises.map(promise => promise.then(identity, identity)));
}

function validatorRunner(fieldName, fieldValue, formSource) {
    return function runValidator(validator) {
        let result;

        try {
            result = validator(fieldValue, fieldName, formSource);
        } catch (e) {
            log.debug(`Validator for '${fieldName}' ignored because the validator threw an error.`);
            log.debug(`${validator}`);
            log.debug(e.message);
            return Promise.resolve(true);
        }

        if (result === false) {
            return Promise.reject(validator.message);
        }

        return Promise.resolve(result);
    };
}

function awaitAsyncValidators(accumulator, validatorPromise, index, validators) {
    if (validatorPromise) {
        accumulator.push(validatorPromise);
    }

    if (validators.length === 0 || validators.length === (index + 1)) {
        return getAllPromiseValues(accumulator);
    }
    return accumulator;
}

function grabErrorMessages(validationStatuses) {
    return validationStatuses.filter(s => s !== true);
}

function getFieldStatus(statusMessages = []) {
    return {
        status: statusMessages.length === 0 ? FormFieldStatuses.VALID : FormFieldStatuses.INVALID,
        messages: statusMessages,
    };
}

export default function createFormValidator(fieldConfigs = [], scheduler) {
    const validatorQueue = new Rx.Subject();
    const statusSubject = new Rx.ReplaySubject(1);
    const initialStatuses = fieldConfigs
        .filter(fieldConfig => Array.isArray(fieldConfig.validators) && fieldConfig.validators.length > 0)
        .map(fc => {
            return [fc.name, { status: FormFieldStatuses.VALID, messages: [] }];
        });
    const formFieldStatuses = new Map(initialStatuses);

    const validatorQueues = new Map(initialStatuses.map(([name]) => [name, new Rx.Subject()]));
    Array.from(validatorQueues.values())
        .forEach(validatorObservable => {
            validatorObservable
                .debounce(300, scheduler)
                .map(({ fieldName, fieldValue, formSource }) => {
                    const fieldConfig = fieldConfigs
                        .filter(fc => fc.name === fieldName)
                        .shift();

                    validatorQueue.onNext(Promise.resolve({ fieldName, fieldStatus: { status: FormFieldStatuses.VALIDATING, messages: [] } }));

                    const validatorToRun = fieldConfig.validators
                        .filter(validator => {
                            if (!isFunction(validator)) {
                                log.warn(`Warning: One of the validators for '${fieldName}' is not a function.`);
                                return false;
                            }
                            return isFunction(validator);
                        })
                        .map(validatorRunner(fieldName, fieldValue, formSource));

                    if (!validatorToRun.length) {
                        return Promise.resolve({
                            fieldName: fieldName,
                            fieldStatus: getFieldStatus(),
                        });
                    }

                    return validatorToRun
                        .reduce(awaitAsyncValidators, [])
                        .then(grabErrorMessages)
                        .then(errorMessages => {
                            return {
                                fieldName: fieldName,
                                fieldStatus: getFieldStatus(errorMessages),
                            };
                        })
                        .catch(log.error);
                })
                .concatAll()
                .subscribe(({ fieldName, fieldStatus }) => {
                    formFieldStatuses.set(fieldName, fieldStatus);
                    statusSubject.onNext(formFieldStatuses);
                });
        });

    validatorQueue
        .concatAll()
        .subscribe((fieldValidatorStatus) => {
            const { fieldName, fieldStatus } = fieldValidatorStatus;
            formFieldStatuses.set(fieldName, fieldStatus);
            statusSubject.onNext(formFieldStatuses);
        });

    const formValidator = {
        status: statusSubject
            .debounce(100),

        setStatus(status) {
            statusSubject.onNext(status);
        },

        /**
         * Start a validation run for a specific field with a provided value. This runs sync and async validators
         * and reports the status back using the `formValidator.status` observable.
         *
         * @param {String} fieldName Name of the field to run the validator for.
         * @param {String} fieldValue Value of the field to run the validator for.
         * @returns {boolean} Returns true when a validator run has started, otherwise false.
         *
         * @example
         * ```js
         *   formValidator.runFor('name', 'Mark');
         * ```
         */
        runFor(fieldName, fieldValue, formSource) {
            if (validatorQueues.has(fieldName)) {
                validatorQueues.get(fieldName).onNext({ fieldName, fieldValue, formSource });
                return true;
            }
            return false;
        },

        /**
         * Returns the current status for the passed field.
         *
         * @param {String} fieldName Name of the field. Generally this is the `name` property on the `fieldConfig`
         * @returns {Object} Status object with a `status` and a `messages` property.
         *
         * @example
         * ```js
         *   formValidator.getStatusFor('password')
         *   // {
         *   //   status: FormFieldStatuses.VALID,
         *   //   messages: []
         *   // }
         * ```
         */
        getStatusFor(fieldName) {
            if (formFieldStatuses.has(fieldName)) {
                return formFieldStatuses.get(fieldName);
            }

            return {
                status: FormFieldStatuses.VALID,
                messages: [],
            };
        },
    };

    return formValidator;
}
