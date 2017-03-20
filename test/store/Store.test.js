import Store from '../../src/store/Store';
import { Observable, TestScheduler } from 'rxjs';
import isEqual from 'lodash/isEqual';
import { expectObservable, cold } from '../../config/marble-testing';

function eventually(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const value = callback();

                resolve(value);
            } catch (e) {
                reject(e);
            }
        });
    });
}

describe('Store', () => {
    let store;
    let testScheduler;
    // let cold;

    beforeEach(() => {
        testScheduler = new TestScheduler((a, b) => isEqual(a, b));
        // cold = ((testScheduler) => (...args) => testScheduler.createColdObservable.apply(testScheduler, args))(testScheduler);

        store = Store.create();
    });

    it('should be a function', () => {
        expect(Store).to.be.instanceof(Function);
    });

    describe('state', () => {
        it('should have a state property that is undefined on default', () => {
            expect(store.state).to.be.undefined;
        });

        it('should be initialized after a value was passed to constructor', () => {
            store = new Store({name: 'Mark'});

            return eventually(() => {
                expect(store.state).to.deep.equal({name: 'Mark'});
            });
        });
    });

    describe('with Promise as initial value', () => {
        it('should resolve the promise and set it as the value', () => {
            store = new Store(Promise.resolve({name: 'Mark'}));

            return eventually(() => {
                expect(store.state).to.deep.equal({name: 'Mark'});
            });
        });

        it('should reject the value not set the state', () => {
            store = new Store(Promise.reject(new Error('Could not load value')));

            return eventually(() => {
                expect(store.state).to.deep.equal(undefined);
            });
        });
    });

    describe('emitState', () => {
        it('should have emitted the intial state when the store was initialized with a state', () => {
            const onNextSpy = spy();
            store = new Store({name: 'Mark'});
            store.subscribe(onNextSpy);

            return eventually(() => {
                expect(store.state).to.deep.equal({name: 'Mark'});
            });
        });

        it('should emit the newly set state', () => {
            const onNextSpy = spy();
            store = new Store();

            store.setState({name: 'Mark'});
            store.subscribe(onNextSpy);

            expect(onNextSpy).to.be.calledWith({name: 'Mark'});
        });

        it('should emit an error when the initial promise fails', () => {
            const onErrorSpy = spy();
            store = new Store(Promise.reject(new Error('Could not load value')));
            store.subscribe(undefined, onErrorSpy);

            return eventually(() => {
                expect(onErrorSpy).to.be.called;
            });
        });

        it('should not emit an undefined value if no inital value has been given', () => {
            const onNextSpy = spy();
            store = new Store();

            store.subscribe(onNextSpy);


            return eventually(() => {
                expect(onNextSpy).not.to.be.called;
            });
        });
    });

    describe('setState', () => {
        it('should be a method', () => {
            expect(store.setState).to.be.instanceof(Function);
        });

        it('should set the state', () => {
            store.setState({name: 'Mark'});

            expect(store.state).to.deep.equal({name: 'Mark'});
        });
    });

    describe('getState', () => {
        it('should be a method', () => {
            expect(store.getState).to.be.instanceof(Function);
        });

        it('should return the set state', () => {
            store.setState({name: 'Mark'});

            expect(store.getState()).to.deep.equal({name: 'Mark'});
        });
    });

    describe('inheritance', () => {
        it('should be able to create a functional subclass', () => {
            class UserStore extends Store {
            }

            const userStore = new UserStore({name: 'Mark', userName: 'markpo'});

            return eventually(() => {
                expect(userStore).to.be.instanceof(Store);
                expect(userStore.state).to.deep.equal({name: 'Mark', userName: 'markpo'});
            });
        });
    });

    describe('observable methods', () => {
        it('should work as expected', (done) => {
            new Store({name: 'Mark'})
                .subscribe((value) => {
                    expect(value).to.deep.equal({name: 'Mark'});
                    done();
                });
        });

        it('should throttle the output', () => {
            store = Store.create();

            const e1 = cold('--a--b--c---|', { a: 'John', b: 'Mark', c: 'Jim' });
            const r1 =      '--a----------';

            const o1 = e1.flatMap((v) => {
                    store.setState({name: v});
                    return store;
                })
                .throttleTime(100);


            expectObservable(o1).toBe(r1, { a: { name: 'John' }});
        });

        it('should still receive replayed values', (done) => {
            store = new Store({name: 'Mark'});

            store.setState({name: 'John'});

            store.subscribe((value) => {
                expect(value).to.deep.equal({name: 'John'});
                done();
            });
        });

        it('should not call completed', () => {
            const completedSpy = spy();
            store = new Store({name: 'Mark'});

            store.setState({name: 'John'});

            store.subscribe(() => {}, () => {}, completedSpy);

            expect(completedSpy).not.to.be.called;
        });
    });

    describe('setSource()', () => {
        it('should be a method', () => {
            expect(store.setSource).to.be.instanceof(Function);
        });

        it('should call setState with the result of the passed Observable', () => {
            spy(store, 'setState');

            store.setSource(Observable.of({name: 'John'}));

            expect(store.setState).to.be.called;
        });

        it('should emit an error when the source emits an error', (done) => {
            spy(store, 'setState');

            store.setSource(Observable.throw('Failed to load'));

            expect(store.setState).not.to.be.called;

            store.subscribe(() => {
            }, (error) => {
                expect(error).to.equal('Rethrown error from source: Failed to load');
                done();
            });
        });
    });

    describe('create()', () => {
        it('should create a store object', () => {
            expect(Store.create()).to.be.instanceof(Store);
        });

        it('should have initialzed the Store with the value of geInitialState', () => {
            store = Store.create({
                getInitialState() {
                    return {name: 'Mark'};
                },
            });

            store.subscribe(value => {
                expect(value).to.deep.equal({name: 'Mark'});
            });
        });

        it('should add the passed methods onto the created object', () => {
            store = Store.create({
                getInitialState() {
                    return {name: 'Mark'};
                },

                getMyCustomValue() {

                },
            });

            expect(store.getMyCustomValue).to.be.instanceof(Function);
        });

        it('should not add getInitialState to the result object', () => {
            store = Store.create({
                getInitialState() {
                    return {name: 'Mark'};
                },

                getMyCustomValue() {

                },
            });

            expect(store.getInitialState).to.be.undefined;
        });

        it('should copy properties from the object onto the created object', () => {
            store = Store.create({
                name: 'MyStore',
                getMyCustomValue() {

                },
            });

            expect(store.name).to.equal('MyStore');
        });
    });
});
