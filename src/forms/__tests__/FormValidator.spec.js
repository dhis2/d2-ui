import log from 'loglevel';
import { TestScheduler } from 'rxjs';
import isEqual from 'lodash/isEqual';
import createFormValidator, { FormFieldStatuses } from '../FormValidator';

describe('FormValidator', () => {
    let formValidator;

    beforeEach(() => formValidator = createFormValidator());

    it('should be be a function', () => {
        expect(typeof createFormValidator).toBe('function');
    });

    describe('status', () => {
        it('should be able to subscribe to the status', () => {
            formValidator.status.subscribe(jest.fn());
        });

        it('should not emit a value on subscription without a status', () => {
            const statusCallBack = jest.fn();
            formValidator.status.subscribe(statusCallBack);

            expect(statusCallBack).not.toHaveBeenCalled();
        });

        it('should emit a value when setStatus was called', (done) => {
            function statusCallback(statusValue) {
                expect(statusValue).toEqual({
                    name: 'name',
                    status: FormFieldStatuses.VALID,
                });
                done();
            }
            formValidator.status.subscribe(statusCallback);

            formValidator.setStatus({
                name: 'name',
                status: FormFieldStatuses.VALID,
            });
        });
    });

    describe('runFor', () => {
        let validators;
        let testScheduler;
        let cold;

        beforeEach(() => {
            testScheduler = new TestScheduler((a, b) => isEqual(a, b));
            cold = (testScheduler => (...args) => testScheduler.createColdObservable(...args))(testScheduler);

            validators = [
                jest.fn().mockReturnValue(true),
                jest.fn().mockReturnValue(true),
            ];

            formValidator = createFormValidator([
                { name: 'name', validators },
                { name: 'code', validators },
            ], testScheduler);
        });

        it('should return false when there are no validators for this fieldName', () => {
            formValidator = createFormValidator();

            expect(formValidator.runFor('name')).toBe(false);
        });

        it('should run the validators for the field it is called with', () => {
            cold('--a-|')
                .map(() => formValidator.runFor('name', 'Mark'))
                .subscribe();

            testScheduler.flush();

            expect(validators[0]).toBeCalledWith('Mark', 'name', undefined);
            expect(validators[1]).toBeCalledWith('Mark', 'name', undefined);
        });

        it('should set the status when the runFor() is called', (done) => {
            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).toEqual([
                    ['name', { status: FormFieldStatuses.VALID, messages: [] }],
                    ['code', { status: FormFieldStatuses.VALID, messages: [] }],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);

            testScheduler.flush();
        });

        it('should emit a status that represents the validator results', (done) => {
            const requiredValidator = jest.fn().mockReturnValue(false);
            requiredValidator.message = 'field_is_required';

            validators.push(requiredValidator);

            formValidator = createFormValidator([
                { name: 'name', validators },
                { name: 'code', validators },
            ], testScheduler);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).toEqual([
                    ['name', { status: FormFieldStatuses.INVALID, messages: ['field_is_required'] }],
                    ['code', { status: FormFieldStatuses.VALID, messages: [] }],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);

            testScheduler.flush();
        });

        it('should emit a pending status for an async validator', (done) => {
            const asyncValidator = jest.fn().mockReturnValue(new Promise(() => {}));

            validators.push(asyncValidator);

            formValidator = createFormValidator([
                { name: 'name', validators },
                { name: 'code', validators },
            ], testScheduler);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).toEqual([
                    ['name', { status: FormFieldStatuses.VALIDATING, messages: [] }],
                    ['code', { status: FormFieldStatuses.VALID, messages: [] }],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);

            testScheduler.flush();
        });

        it('should pass the field validation when the async validator resolves', (done) => {
            const asyncValidator = jest.fn().mockReturnValue(Promise.resolve(true));

            validators.push(asyncValidator);

            formValidator = createFormValidator([
                { name: 'name', validators },
                { name: 'code', validators },
            ]);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).toEqual([
                    ['name', { status: FormFieldStatuses.VALID, messages: [] }],
                    ['code', { status: FormFieldStatuses.VALID, messages: [] }],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);
        });

        it('should fail the field validation when the async validator rejects', (done) => {
            const asyncValidator = jest.fn(() => Promise.reject('field_should_pass_async'));

            validators.push(asyncValidator);

            formValidator = createFormValidator([
                { name: 'name', validators },
                { name: 'code', validators },
            ]);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).toEqual([
                    ['name', { status: FormFieldStatuses.INVALID, messages: ['field_should_pass_async'] }],
                    ['code', { status: FormFieldStatuses.VALID, messages: [] }],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);
        });

        it('should log an error when something fails', () => {
            jest.spyOn(log, 'debug');

            function throwingValidator() {
                throw new Error('Something failed!');
            }

            validators.push(throwingValidator);

            formValidator.runFor('name', 'Mark');

            testScheduler.flush();

            expect(log.debug).toHaveBeenCalledWith('Validator for \'name\' ignored because the validator threw an error.');
            expect(log.debug).toHaveBeenCalledWith(`${throwingValidator}`);
            expect(log.debug).toHaveBeenCalledWith('Something failed!');
        });
    });

    describe('getStatusFor', () => {
        beforeEach(() => {
            const validators = [
                jest.fn().mockReturnValue(true),
                jest.fn().mockReturnValue(true),
            ];

            formValidator = createFormValidator([
                { name: 'name', validators },
                { name: 'code', validators },
            ]);
        });

        it('should return the current status for the field', () => {
            expect(formValidator.getStatusFor('name')).toEqual({
                status: FormFieldStatuses.VALID,
                messages: [],
            });
        });
    });
});
