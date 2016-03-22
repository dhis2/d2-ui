import {Observable} from 'rx';
import logLevel from 'loglevel';
import Action from '../../src/action/Action';

describe('Action', () => {
    beforeEach(() => {
        // Hide logging from test output
        logLevel.setLevel(logLevel.levels.ERROR);
    });

    describe('object', () => {
        describe('createActionsFromNames()', () => {
            it('should return an object with Actions', () => {
                const createdActions = Action.createActionsFromNames(['add', 'edit', 'delete', 'clone']);

                expect(createdActions.add).to.be.instanceof(Function);
                expect(createdActions.edit).to.be.instanceof(Function);
                expect(createdActions.delete).to.be.instanceof(Function);
                expect(createdActions.clone).to.be.instanceof(Function);
            });

            it('should have set the names on the actions', () => {
                const createdActions = Action.createActionsFromNames(['add', 'edit', 'delete', 'clone']);

                expect(createdActions.add.id.toString()).to.equal('Symbol(add)');
                expect(createdActions.edit.id.toString()).to.equal('Symbol(edit)');
                expect(createdActions.delete.id.toString()).to.equal('Symbol(delete)');
                expect(createdActions.clone.id.toString()).to.equal('Symbol(clone)');
            });

            it('should return an empty object if there are no actions given', () => {
                const createdActions = Action.createActionsFromNames([]);

                expect(createdActions).to.deep.equal({});
            });

            it('should return an empty object if the parameter is undefined', () => {
                const createdActions = Action.createActionsFromNames();

                expect(createdActions).to.deep.equal({});
            });

            it('should add a prefix to the action names if it was provided', () => {
                const createdActions = Action.createActionsFromNames(['add', 'edit', 'delete', 'clone'], 'user');

                expect(createdActions.add.id.toString()).to.equal('Symbol(user.add)');
                expect(createdActions.edit.id.toString()).to.equal('Symbol(user.edit)');
                expect(createdActions.delete.id.toString()).to.equal('Symbol(user.delete)');
                expect(createdActions.clone.id.toString()).to.equal('Symbol(user.clone)');
            });
        });
    });

    describe('instance', () => {
        let actionInstance;

        beforeEach(() => {
            actionInstance = Action.create();
        });

        describe('identifier', () => {
            let action;

            it('should create a symbol based on the given name', () => {
                action = Action.create('add');

                expect(action.id.toString()).to.equal('Symbol(add)');
            });

            it('should create a symbol with Anonymous name when no name is specified', () => {
                action = Action.create();

                expect(action.id.toString()).to.equal('Symbol(AnonymousAction)');
            });

            it('should not be able to override the id', () => {
                action = Action.create('add');

                expect(() => action.id = 'overridden id').to.throw();

                expect(action.id.toString()).to.equal('Symbol(add)');
            });
        });

        describe('executing', () => {
            it('should emit to subscribers', (done) => {
                actionInstance.subscribe(() => {
                    done();
                });

                actionInstance({name: 'Mark'});
            });

            it('should pass the value to the subscriber', (done) => {
                actionInstance.subscribe((action) => {
                    expect(action.data).to.deep.equal({name: 'Mark'});
                    done();
                });

                actionInstance({name: 'Mark'});
            });

            it('should call logLevel.trace', () => {
                spy(logLevel, 'trace');

                Action.create('add')('Mark');

                expect(logLevel.trace).to.be.calledWith('Firing action: Symbol(add)');
            });

            it('should return an Observable', () => {
                const actionResultObservable = Action.create('add')('Mark');

                expect(actionResultObservable).to.be.instanceof(Observable);
            });

            it('should notify the execute subscriber of success', (done) => {
                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.complete('Added!');
                });

                actionInstance('Mark')
                    .subscribe((value) => {
                        expect(value).to.equal('Added!');
                        done();
                    });
            });

            it('should call logLevel.trace when action completed', (done) => {
                spy(logLevel, 'trace');

                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.complete('Added!');
                });

                actionInstance('Mark')
                    .subscribe(() => {
                        expect(logLevel.trace).to.be.calledWith('Completed action: Symbol(add)');
                        done();
                    });
            });

            it('should notify the execute subscriber of error', (done) => {
                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.error('Failed to add!');
                });

                actionInstance('Mark')
                    .subscribe(
                        () => {},
                        (value) => {
                            expect(value).to.equal('Failed to add!');
                            done();
                        });
            });

            it('should notify the execute subscriber of error', (done) => {
                spy(logLevel, 'debug');

                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.error('Failed to add!');
                });

                actionInstance('Mark')
                    .subscribe(
                    () => {},
                    () => {
                        expect(logLevel.debug).to.be.calledWith('Errored action: Symbol(add)');
                        done();
                    });
            });

            it('should complete the execute subscriber of success', (done) => {
                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.complete();
                });

                actionInstance('Mark')
                    .subscribe(
                    () => {},
                    () => {},
                    done);
            });

            it('should not execute the success handler twice', (done) => {
                const successHandlerSpy = spy();
                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.complete();
                });

                actionInstance.subscribe((action) => {
                    action.complete();
                });

                actionInstance('Mark')
                    .subscribe(
                    successHandlerSpy,
                    () => {},
                    () => {
                        expect(successHandlerSpy).to.be.called;
                        expect(successHandlerSpy.callCount).to.equal(1);
                        done();
                    });
            });
        });
    });
});
