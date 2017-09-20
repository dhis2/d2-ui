import { Observable } from 'rxjs';
import logLevel from 'loglevel';
import Action from '../Action';

describe('Action', () => {
    beforeEach(() => {
        // Hide logging from test output
        logLevel.setLevel(logLevel.levels.ERROR);
    });

    describe('object', () => {
        describe('createActionsFromNames()', () => {
            it('should return an object with Actions', () => {
                const createdActions = Action.createActionsFromNames(['add', 'edit', 'delete', 'clone']);

                expect(createdActions.add).toBeInstanceOf(Function);
                expect(createdActions.edit).toBeInstanceOf(Function);
                expect(createdActions.delete).toBeInstanceOf(Function);
                expect(createdActions.clone).toBeInstanceOf(Function);
            });

            it('should have set the names on the actions', () => {
                const createdActions = Action.createActionsFromNames(['add', 'edit', 'delete', 'clone']);

                expect(createdActions.add.id.toString()).toBe('Symbol(add)');
                expect(createdActions.edit.id.toString()).toBe('Symbol(edit)');
                expect(createdActions.delete.id.toString()).toBe('Symbol(delete)');
                expect(createdActions.clone.id.toString()).toBe('Symbol(clone)');
            });

            it('should return an empty object if there are no actions given', () => {
                const createdActions = Action.createActionsFromNames([]);

                expect(createdActions).toEqual({});
            });

            it('should return an empty object if the parameter is undefined', () => {
                const createdActions = Action.createActionsFromNames();

                expect(createdActions).toEqual({});
            });

            it('should add a prefix to the action names if it was provided', () => {
                const createdActions = Action.createActionsFromNames(['add', 'edit', 'delete', 'clone'], 'user');

                expect(createdActions.add.id.toString()).toBe('Symbol(user.add)');
                expect(createdActions.edit.id.toString()).toBe('Symbol(user.edit)');
                expect(createdActions.delete.id.toString()).toBe('Symbol(user.delete)');
                expect(createdActions.clone.id.toString()).toBe('Symbol(user.clone)');
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

                expect(action.id.toString()).toBe('Symbol(add)');
            });

            it('should create a symbol with Anonymous name when no name is specified', () => {
                action = Action.create();

                expect(action.id.toString()).toBe('Symbol(AnonymousAction)');
            });

            it('should not be able to override the id', () => {
                action = Action.create('add');

                expect(() => action.id = 'overridden id').toThrow();

                expect(action.id.toString()).toBe('Symbol(add)');
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
                    expect(action.data).toEqual({name: 'Mark'});
                    done();
                });

                actionInstance({name: 'Mark'});
            });

            it('should call logLevel.trace', () => {
                jest.spyOn(logLevel, 'trace');

                Action.create('add')('Mark');

                expect(logLevel.trace).toHaveBeenCalledWith('Firing action: Symbol(add)');
            });

            it('should return an Observable', () => {
                const actionResultObservable = Action.create('add')('Mark');

                expect(actionResultObservable).toBeInstanceOf(Observable);
            });

            it('should notify the execute subscriber of success', (done) => {
                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.complete('Added!');
                });

                actionInstance('Mark')
                    .subscribe((value) => {
                        expect(value).toBe('Added!');
                        done();
                    });
            });

            it('should call logLevel.trace when action completed', (done) => {
                jest.spyOn(logLevel, 'trace');

                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.complete('Added!');
                });

                actionInstance('Mark')
                    .subscribe(() => {
                        expect(logLevel.trace).toHaveBeenCalledWith('Completed action: Symbol(add)');
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
                            expect(value).toBe('Failed to add!');
                            done();
                        });
            });

            it('should notify the execute subscriber of error', (done) => {
                jest.spyOn(logLevel, 'debug');

                actionInstance = Action.create('add');

                actionInstance.subscribe((action) => {
                    action.error('Failed to add!');
                });

                actionInstance('Mark')
                    .subscribe(
                    () => {},
                    () => {
                        expect(logLevel.debug).toHaveBeenCalledWith('Errored action: Symbol(add)');
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
                const successHandlerSpy = jest.fn();
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
                        expect(successHandlerSpy).toHaveBeenCalledTimes(1);
                        done();
                    });
            });
        });
    });
});
