import { combineReducers } from 'redux';
import periodType from "./periodType";
import offeredPeriods from './offeredPeriods';
import selectedPeriods from './selectedPeriods';

export default combineReducers({
    periodType,
    offeredPeriods,
    selectedPeriods,
});
