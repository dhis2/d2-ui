import AsyncValidatorRunner from '../../src/forms/AsyncValidatorRunner';
import { Subject, TestScheduler } from 'rxjs';
import isEqual from 'lodash/isEqual';

describe('AsyncValidatorRunner', () => {
    it('should be an object', () => {
        expect(AsyncValidatorRunner).to.be.a('function');
    });

    describe('create()', () => {
        it('should be a method on the AsyncValidatorRunner', () => {
            expect(AsyncValidatorRunner.create).to.be.a('function');
        });

        it('should return a instance of AyncValidatorRunner', () => {
            expect(AsyncValidatorRunner.create()).to.be.instanceof(AsyncValidatorRunner);
        });
    });

    describe('instance', () => {
        it('should not set the scheduler property by default', () => {
            const asyncValidatorRunner = AsyncValidatorRunner.create();

            expect(asyncValidatorRunner.scheduler).to.be.undefined;
        });

        it('should set the scheduler if one has been passed in', () => {
            const testScheduler  = new TestScheduler((a, b) => isEqual(a, b));
            const asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);

            expect(asyncValidatorRunner.scheduler).to.equal(testScheduler);
        });

        it('should have a validatorPipeline property that is an Rx.Subject', () => {
            const asyncValidatorRunner = AsyncValidatorRunner.create();

            expect(asyncValidatorRunner.validatorPipeline).to.be.instanceof(Subject);
        });
    });

    describe('run()', () => {
        let asyncValidatorRunner;

        beforeEach(() => {
            const testScheduler = new TestScheduler((a, b) => isEqual(a, b));
            asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);
        });

        it('should not throw when the validatorsArray is empty', () => {
            expect(() => asyncValidatorRunner.run('name', [], 'Zoe')).not.to.throw();
        });

        it('should return the ayncValidatorRunner', () => {
            expect(asyncValidatorRunner.run('name', [], 'Zoe')).to.equal(asyncValidatorRunner);
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
                sinon.stub().returns(Promise.resolve()),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => {
                        expect(asyncValidators[0]).to.have.callCount(1);
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
                sinon.stub().returns(Promise.resolve()),
                sinon.stub().returns(Promise.reject('not_unique')),
                sinon.stub().returns(Promise.resolve()),
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
                sinon.stub().returns(Promise.resolve()),
                sinon.stub().returns(Promise.reject('not_unique')),
                sinon.stub().returns(Promise.resolve()),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    validationResult => {
                        expect(validationResult).to.deep.equal({
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
                        expect(validationResult).to.deep.equal(expectedResult);
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
                sinon.spy(),
                sinon.spy(),
                sinon.spy(),
            ];

            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => {
                        expect(nameValidators[0]).to.be.calledWith('Zoe');
                        expect(nameValidators[1]).to.be.calledWith('Zoe');
                        expect(nameValidators[2]).to.be.calledWith('Zoe');
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
