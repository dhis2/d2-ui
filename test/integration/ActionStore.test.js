import Action from '../../src/action/Action';
import Store from '../../src/store/Store';

describe('Integration ActionStore', () => {
    let crudActions;
    let store;

    beforeEach(() => {
        crudActions = Action.createActionsFromNames(['create', 'read', 'update', 'delete']);

        class CrudStore extends Store {
            create(action) {
                action.complete('created');
            }

            read() {}

            update() {}

            delete() {}
        }

        store = new CrudStore();
        // store = Store.create();
        //console.log(store.subscribe);
    });

    it('store should react to the create action', (done) => {
        crudActions.create
            .subscribe((action) => {
                store.setState(action.data);
            });

        store.subscribe(storeState => {
        //    expect(storeState).toBe('newState');
            done();
        });

        crudActions.create('newState');
    });

    it('store fullfil the action result', (done) => {
        crudActions.create
            .subscribe((action) => {
                store.create(action);
            });

        crudActions.create('newState')
            .subscribe((createResult) => {
                expect(createResult).toBe('created');
                done();
            });
    });

    it('should only notify the subscriber that triggered the action', (done) => {
        const createStub = jest.spyOn(store, 'create');
        const callbackOld = jest.fn();
        const callbackNew = jest.fn();

        crudActions.create.subscribe(createStub);

        crudActions.create('oldState').subscribe(callbackOld);
        crudActions.create('newState').subscribe(callbackNew);

        setTimeout(() => {
            expect(createStub).toHaveBeenCalledTimes(2);
            expect(callbackOld).toHaveBeenCalledTimes(1);
            expect(callbackNew).toHaveBeenCalledTimes(1);
            done();
        }, 50);
    });
});
