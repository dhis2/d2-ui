import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

const publishState = Symbol('publishState');
const publishError = Symbol('publishError');

const observableSymbol = Symbol('observable');

class Store extends Observable {
    constructor(initialValue) {
        super();

        this[observableSymbol] = new ReplaySubject(1);

        if (initialValue) {
            Promise.resolve(initialValue)
                .then((value) => {
                    this.setState(value);
                })
                .catch((error) => {
                    this[publishError](error);
                });
        }
    }

    setState(newState) {
        this.state = newState;
        this[publishState]();
    }

    getState() {
        return this.state;
    }

    setSource(observableSource) {
        observableSource.subscribe(
            value => this.setState(value),
            error => this[publishError](`Rethrown error from source: ${error}`),
        );
    }

    _subscribe(observer) {
        return this[observableSymbol].subscribe(observer);
    }

    /** ***************************************************************************************************************
     * Private methods
     **************************************************************************************************************** */

    [publishState]() {
        return this[observableSymbol].next(this.state);
    }

    [publishError](error) {
        return this[observableSymbol].error(error);
    }

    /** ***************************************************************************************************************
     * Static methods
     **************************************************************************************************************** */

    static create(storeConfig) {
        let initialState;
        const mergeObject = {};

        if (storeConfig) {
            if (storeConfig.getInitialState) {
                initialState = storeConfig && storeConfig.getInitialState();
            }

            Object.keys(storeConfig)
                .filter(keyName => keyName !== 'getInitialState')
                .forEach((keyName) => {
                    mergeObject[keyName] = storeConfig[keyName];
                    return mergeObject;
                });
        }

        return Object.assign(new Store(initialState), mergeObject);
    }
}

export default Store;
