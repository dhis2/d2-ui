import { combineReducers } from 'redux';
import periodType from "./periodType";
import selectedPeriods from "./selectedPeriods";


export default combineReducers({
    periodType,
    selectedPeriods,
});
