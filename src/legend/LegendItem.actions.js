import Action from '../action/Action';
import { setDialogStateTo } from './LegendItem.store';

export const setDialogStateToAction = Action.create('setDialogStateToAction'); // name in debug

setDialogStateToAction.subscribe((action) => setDialogStateTo(action.data));
