import { combineReducers } from 'redux';
import periodType from "./periodType";
import periods from './periods';

export default combineReducers({
    periodType,
    offeredPeriods: periods('offered'),
    selectedPeriods: periods('selected'),
});
