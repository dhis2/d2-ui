import reactTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import IndicatorExpressionManager from '../src/indicator-expression-manager/IndicatorExpressionManager.component';
import indicatorExpressionStatusActions from './indicatorExpressionStatus.action.mock';
import indicatorExpressionStatusStore from '../src/indicator-expression-manager/indicatorExpressionStatus.store';
import dataElementOperandStore from '../src/indicator-expression-manager/dataElementOperand.store';
import dataElementOperandSelectorActions from '../src/indicator-expression-manager/dataElementOperandSelector.actions';
import d2 from './mockD2';

reactTapEventPlugin();

dataElementOperandSelectorActions.loadList.subscribe(action => {
    d2.models.dataElementOperand.list().then(collection => {
        dataElementOperandStore.setState(collection);
    });
});

const IndicatorExpressionManagerExample = React.createClass({
    getInitialState() {
        return {
            organisationUnitGroupOptions: [
                {value: 'PvuaP6YALSA', label: 'Community'},
                {value: 'cNzfcPWEGSH', label: 'Country'},
                {value: 'POHZmzofoVx', label: 'Facility'},
                {value: 'NUPoPEBGCq9', label: 'OUs and Countries'},
            ],
            constantOptions: [
                {value: 'nD4XIHN3RtU', label: 'PI'},
            ],
        };
    },

    render() {
        return (
            <div style={{maxWidth: '80%', margin: '0 auto'}}>
                <IndicatorExpressionManager
                    descriptionLabel="Numerator description"
                    organisationUnitGroupOptions={this.state.organisationUnitGroupOptions}
                    constantOptions={this.state.constantOptions}
                    expressionStatusActions={indicatorExpressionStatusActions}
                    expressionStatusStore={indicatorExpressionStatusStore}
                    dataElementOperandSelectorActions={dataElementOperandSelectorActions}
                    indicatorExpressionChanged={function expressionChangedCallback(data) {
                        console.log('Expression changed!', data);
                    }}
                    />
            </div>
        );
    },
});

export default IndicatorExpressionManagerExample;
