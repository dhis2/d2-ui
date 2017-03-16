import createFormValidator from '../../src/forms/FormValidator';
import {FormFieldStatuses} from '../../src/forms/FormValidator';
import log from 'loglevel';
import { TestScheduler } from 'rxjs';
import isEqual from 'lodash/isEqual';

describe('FormValidator', () => {
    let formValidator;

    beforeEach(() => formValidator = createFormValidator());

    it('should be be a function', () => {
        expect(createFormValidator).to.be.a('function');
    });

    describe('status', () => {
        it('should be able to subscribe to the status', () => {
            formValidator.status.subscribe(spy());
        });

        it('should not emit a value on subscription without a status', () => {
            const statusCallBack = spy();
            formValidator.status.subscribe(statusCallBack);

            expect(statusCallBack).not.to.be.called;
        });

        it('should emit a value when setStatus was called', (done) => {
            function statusCallback(statusValue) {
                expect(statusValue).to.deep.equal({
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
            cold = ((testScheduler) => (...args) => testScheduler.createColdObservable.apply(testScheduler, args))(testScheduler);

            validators = [
                sinon.stub().returns(true),
                sinon.stub().returns(true),
            ];

            formValidator = createFormValidator([
                {name: 'name', validators},
                {name: 'code', validators},
            ], testScheduler);
        });

        it('should return false when there are no validators for this fieldName', () => {
            formValidator = createFormValidator();

            expect(formValidator.runFor('name')).to.be.false;
        });

        it('should run the validators for the field it is called with', () => {
            cold('--a-|')
                .map(() => formValidator.runFor('name', 'Mark'))
                .subscribe();

            testScheduler.flush();

            expect(validators[0]).to.be.calledWith('Mark', 'name');
            expect(validators[1]).to.be.calledWith('Mark', 'name');
        });

        it('should set the status when the runFor() is called', (done) => {
            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).to.deep.equal([
                    ['name', {status: FormFieldStatuses.VALID, messages: []}],
                    ['code', {status: FormFieldStatuses.VALID, messages: []}],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);

            testScheduler.flush();
        });

        it('should emit a status that represents the validator results', (done) => {
            const requiredValidator = stub().returns(false);
            requiredValidator.message = 'field_is_required';

            validators.push(requiredValidator);

            formValidator = createFormValidator([
                {name: 'name', validators},
                {name: 'code', validators},
            ], testScheduler);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).to.deep.equal([
                    ['name', {status: FormFieldStatuses.INVALID, messages: ['field_is_required']}],
                    ['code', {status: FormFieldStatuses.VALID, messages: []}],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);

            testScheduler.flush();
        });

        it('should emit a pending status for an async validator', (done) => {
            const asyncValidator = stub().returns(new Promise(() => {}));

            validators.push(asyncValidator);

            formValidator = createFormValidator([
                {name: 'name', validators},
                {name: 'code', validators},
            ], testScheduler);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).to.deep.equal([
                    ['name', {status: FormFieldStatuses.VALIDATING, messages: []}],
                    ['code', {status: FormFieldStatuses.VALID, messages: []}],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);

            testScheduler.flush();
        });

        it('should pass the field validation when the async validator resolves', (done) => {
            const asyncValidator = stub().returns(Promise.resolve(true));

            validators.push(asyncValidator);

            formValidator = createFormValidator([
                {name: 'name', validators},
                {name: 'code', validators},
            ]);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).to.deep.equal([
                    ['name', {status: FormFieldStatuses.VALID, messages: []}],
                    ['code', {status: FormFieldStatuses.VALID, messages: []}],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);
        });

        it('should fail the field validation when the async validator rejects', (done) => {
            const asyncValidator = stub().returns(Promise.reject('field_should_pass_async'));

            validators.push(asyncValidator);

            formValidator = createFormValidator([
                {name: 'name', validators},
                {name: 'code', validators},
            ]);

            function statusCallback(statusValue) {
                expect(Array.from(statusValue)).to.deep.equal([
                    ['name', {status: FormFieldStatuses.INVALID, messages: ['field_should_pass_async']}],
                    ['code', {status: FormFieldStatuses.VALID, messages: []}],
                ]);
                done();
            }

            formValidator.runFor('name');

            formValidator.status.subscribe(statusCallback);
        });

        it('should log a warning when a validator is not a function', () => {
            stub(log, 'warn');

            validators.push('Not a validator');

            formValidator.runFor('name', 'Mark');

            testScheduler.flush();

            expect(log.warn).to.be.calledWith(`Warning: One of the validators for 'name' is not a function.`);
        });

        it('should log an error when something fails', () => {
            stub(log, 'debug');

            function throwingValidator() {
                throw new Error('Something failed!');
            }

            validators.push(throwingValidator);

            formValidator.runFor('name', 'Mark');

            testScheduler.flush();

            expect(log.debug).to.be.calledWith(`Validator for 'name' ignored because the validator threw an error.`);
            expect(log.debug).to.be.calledWith(`${throwingValidator}`);
            expect(log.debug).to.be.calledWith('Something failed!');
        });
    });

    describe('getStatusFor', () => {
        beforeEach(() => {
            const validators = [
                sinon.stub().returns(true),
                sinon.stub().returns(true),
            ];

            formValidator = createFormValidator([
                {name: 'name', validators},
                {name: 'code', validators},
            ]);
        });

        it('should return the current status for the field', () => {
            expect(formValidator.getStatusFor('name')).to.deep.equal({
                status: FormFieldStatuses.VALID,
                messages: [],
            });
        });
    });
});
