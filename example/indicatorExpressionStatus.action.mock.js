import Action from 'd2-flux/action/Action';
import indicatorExpressionStatusStore from '../src/indicator-expression-manager/indicatorExpressionStatus.store';

const indicatorExpressionStatusActions = Action.createActionsFromNames(['requestExpressionStatus']);

indicatorExpressionStatusActions.requestExpressionStatus
    .throttle(500)
    .subscribe(action => {
        const encodedFormula =  encodeURIComponent(action.data);
        const url = `/api/expressions/description?expression=${encodedFormula}`;
        console.log(url);
        const tempResponse = {"httpStatus":"OK","httpStatusCode":200,"status":"OK","message":"Valid","description":"BS_SCREEN (N, DSD, Result): Blood Units Screened (Negative) + OUs and Countries"};
        indicatorExpressionStatusStore.setState(tempResponse);
    });

export default indicatorExpressionStatusActions;
