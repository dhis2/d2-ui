import { combineReducers } from 'redux';
import { createStore } from "redux";
import periodType from "./periodType";
import periods from './periods';

export const reducers = combineReducers({
    periodType,
    offeredPeriods: periods('offered'),
    selectedPeriods: periods('selected'),
});

export const Store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
