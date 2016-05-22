import AsyncValidatorRunner from '../../src/forms/AsyncValidatorRunner';
import Rx from 'rx';

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
            const testScheduler = new Rx.TestScheduler();
            const asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);

            expect(asyncValidatorRunner.scheduler).to.equal(testScheduler);
        });

        it('should have a validatorPipeline property that is an Rx.Subject', () => {
            const asyncValidatorRunner = AsyncValidatorRunner.create();

            expect(asyncValidatorRunner.validatorPipeline).to.be.instanceof(Rx.Subject);
        });
    });

    describe('run()', () => {
        let asyncValidatorRunner;
        let testScheduler;

        beforeEach(() => {
            testScheduler = new Rx.TestScheduler();
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
        let asyncValidatorRunner;
        let testScheduler;

        beforeEach(() => {
            testScheduler = new Rx.TestScheduler();
            asyncValidatorRunner = AsyncValidatorRunner.create(testScheduler);
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

            testScheduler.schedule(200, () => asyncValidatorRunner.run('name', asyncValidators, 'Zoe'));
            testScheduler.schedule(300, () => asyncValidatorRunner.run('name', asyncValidators, 'Jane'));
            testScheduler.schedule(350, () => asyncValidatorRunner.run('name', asyncValidators, 'John'));
            testScheduler.advanceTo(600);
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

            testScheduler.schedule(200, () => asyncValidatorRunner.run('name', asyncValidators, 'Zoe'));
            testScheduler.advanceTo(600);
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

            testScheduler.schedule(200, () => asyncValidatorRunner.run('name', asyncValidators, 'Zoe'));
            testScheduler.advanceTo(600);
        });


        it('should resolve to true when the validatorsArray is empty', (done) => {
            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    () => done(),
                    (e) => done(e)
                );

            testScheduler.schedule(200, () => asyncValidatorRunner.run('name', [], 'Zoe'));
            testScheduler.advanceTo(600);
        });

        it('should emit the correct result structure', (done) => {
            asyncValidatorRunner.listenToValidatorsFor('name')
                .subscribe(
                    (validationResult) => {
                        expect(validationResult).to.deep.equal({ fieldName: 'name', isValid: true, value: 'Zoe' });
                        done();
                    },
                    (e) => done(e)
                );

            testScheduler.schedule(200, () => asyncValidatorRunner.run('name', [], 'Zoe'));
            testScheduler.advanceTo(600);
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

            testScheduler.schedule(200, () => asyncValidatorRunner.run('name', nameValidators, 'Zoe'));
            testScheduler.advanceTo(600);
        });
    });
});
