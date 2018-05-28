import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import observable from 'redux-observable';
import reducer from './reducers';

const configureStore = () => {
    const middlewares = [
        thunk,
        // observable,
    ];

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (
        !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        process.env.NODE_ENV !== 'production'
    ) {
        middlewares.push(createLogger());
    }

    return createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
};

export default configureStore;
