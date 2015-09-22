import Action from 'd2-flux/action/Action';
import dataElementOperandStore from './dataElementOperand.store';

const dataElementOperandSelectorActions = Action.createActionsFromNames(['loadByName', 'loadList', 'nextPage', 'previousPage']);

dataElementOperandSelectorActions.loadList.subscribe(action => {
    action.data.then(collection => {
        dataElementOperandStore.setState(collection);
    });
});

export default dataElementOperandSelectorActions;
