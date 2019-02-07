import { createStore, combineReducers } from 'redux';
import periodTypeReducer from './periodType';
import periodsReducer from './periods';

export const reducers = combineReducers({
    periodType: periodTypeReducer,
    offeredPeriods: periodsReducer('offered'),
    selectedPeriods: periodsReducer('selected'),
});

export default createStore(
    reducers,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: 'period-selector branch'}),
);
