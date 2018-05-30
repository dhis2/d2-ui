import React from 'react';
import PeriodsList from './PeriodsList';

class SelectedPeriods extends React.Component {
    render() {
        return <div className="selector-area">
            <h4 className="title">Selected periods</h4>
            <PeriodsList periods={this.props.periods} onPeriodClick={this.props.onPeriodClick} />
        </div>
    }
}

export default SelectedPeriods;
