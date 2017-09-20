import { Subject, TestScheduler } from 'rxjs';
import isEqual from 'lodash/isEqual';
import AsyncValidatorRunner from '../AsyncValidatorRunner';

describe('AsyncValidatorRunner', () => {
    it('should be an object', () => {
        expect(typeof AsyncValidatorRunner).toBe('function');
    });

    describe('create()', () => {
        it('should be a method on the AsyncValidatorRunner', () => {
            expect(typeof AsyncValidatorRunner.create).toBe('function');
        });

        it('should return a instance of AyncValidatorRunner', () => {
            expect(AsyncValidatorRunner.create()).toBeInstanceOf(AsyncValidatorRunner);
        });
    });

    describe('instance', () => {
        it('should not set the scheduler property by default', () => {
            const asyncValidatorRunner = AsyncValidatorRunner.create();

            expect(asyncValidatorRunner.scheduler).toBe(undefined);
        });

        it('should set the scheduler if one has been passed in', () => {
            const testScheduler  = new TestScheduler((a, b) => isEqual(a, b));
            const asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);

            expect(asyncValidatorRunner.scheduler).toEqual(testScheduler);
        });

        it('should have a validatorPipeline property that is an Rx.Subject', () => {
            const asyncValidatorRunner = AsyncValidatorRunner.create();

            expect(asyncValidatorRunner.validatorPipeline).toBeInstanceOf(Subject);
        });
    });

    describe('run()', () => {
        let asyncValidatorRunner;

        beforeEach(() => {
            const testScheduler = new TestScheduler((a, b) => isEqual(a, b));
            asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);
        });

        it('should not throw when the validatorsArray is empty', () => {
            expect(() => asyncValidatorRunner.run('name', [], 'Zoe')).not.toThrow();
        });

        it('should return the ayncValidatorRunner', () => {
            expect(asyncValidatorRunner.run('name', [], 'Zoe')).toEqual(asyncValidatorRunner);
        });
    });

    describe('listenToValidatorsFor()', () => {
        let testScheduler;
        let asyncValidatorRunner;
        let asyncCold;

        beforeEach(() => {
            testScheduler = new TestScheduler((a, b) => isEqual(a, b));
            asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);
            asyncCold = ((testScheduler) => (...args) => testScheduler.createColdObservable.apply(testScheduler, args))(testScheduler);
        });

        it('should debounce the values coming in', (done) => {
            const asyncValidators = [
                jest.fn().mockReturnValue(Promise.resolve()),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => {
                        expect(asyncValidators[0]).toHaveBeenCalledTimes(1);
                        done();
                    },
                    (e) => done(e)
                );


            asyncCold('---a----b---c-|', { a: 'Zoe', b: 'Jane', c: 'John' })
                .subscribe(name => asyncValidatorRunner.run('name', asyncValidators, name));

            testScheduler.flush();
        });

        it('should still resolve when the one of the validators throws', (done) => {
            const asyncValidators = [
                jest.fn().mockReturnValue(Promise.resolve()),
                jest.fn().mockReturnValue(Promise.reject('not_unique')),
                jest.fn().mockReturnValue(Promise.resolve()),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => done(),
                    (e) => done(e)
                );

            asyncCold('----a-b-c-|', { a: 'Zoe', b: 'Jane', c: 'John' })
                .subscribe(name => asyncValidatorRunner.run('name', asyncValidators, name));

            testScheduler.flush();
        });

        it('should resolve with the correct result structure after a failing validator', (done) => {
            const asyncValidators = [
                jest.fn().mockReturnValue(Promise.resolve()),
                jest.fn().mockReturnValue(Promise.reject('not_unique')),
                jest.fn().mockReturnValue(Promise.resolve()),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    validationResult => {
                        expect(validationResult).toEqual({
                            fieldName: 'name',
                            isValid: false,
                            value: 'Zoe',
                            message: 'not_unique',
                        });
                        done();
                    },
                    e => done(e)
                );

            asyncCold('---a--|', { a: 'Zoe' })
                .subscribe(name => asyncValidatorRunner.run('name', asyncValidators, name));

            testScheduler.flush();
        });


        it('should resolve to true when the validatorsArray is empty', (done) => {
            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => done(),
                    (e) => done(e)
                );

            asyncCold('---a--|', { a: 'Zoe' })
                .subscribe(name => asyncValidatorRunner.run('name', [], name));

            testScheduler.flush();
        });

        it('should emit the correct result structure', (done) => {
            const expectedResult = { fieldName: 'name', isValid: true, value: 'Zoe' };

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    (validationResult) => {
                        expect(validationResult).toEqual(expectedResult);
                        done();
                    },
                    (e) => done(e)
                );

            asyncCold('---a--|', { a: 'Zoe' })
                .subscribe(name => asyncValidatorRunner.run('name', [], name));

            testScheduler.flush();
        });

        it('should run the passed validators for the field', (done) => {
            const nameValidators = [
                jest.fn(),
                jest.fn(),
                jest.fn(),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => {
                        expect(nameValidators[0]).toBeCalledWith('Zoe');
                        expect(nameValidators[1]).toBeCalledWith('Zoe');
                        expect(nameValidators[2]).toBeCalledWith('Zoe');
                        done();
                    },
                    (e) => done(e)
                );

            asyncCold('---a--|', { a: 'Zoe' })
                .subscribe(name => asyncValidatorRunner.run('name', nameValidators, name));

            testScheduler.flush();
        });
    });
});
