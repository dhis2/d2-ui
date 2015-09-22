import React from 'react';
import IndicatorExpressionManager from '../src/indicator-expression-manager/IndicatorExpressionManager.component';

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
            <IndicatorExpressionManager
                descriptionLabel="Numerator description"
                organisationUnitGroupOptions={this.state.organisationUnitGroupOptions}
                constantOptions={this.state.constantOptions}
                />
        );
    },
});

export default IndicatorExpressionManagerExample;
