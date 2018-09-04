import React from 'react';
import PeriodsList from './PeriodsList';
import PropTypes from 'prop-types';

class SelectedPeriods extends React.Component {
    constructor(props, context) {
        super(props);

        this.i18n = context.d2.i18n;
        console.log('ggggg');
        console.log(this.i18n);
    }

    render() {
        return <div className="selector-area">
            <h4 className="title">
                {this.i18n.getTranslation('Selected periods')}
            </h4>
            <PeriodsList periods={this.props.periods} onPeriodClick={this.props.onPeriodClick} />
        </div>
    }
}

SelectedPeriods.contextTypes = {
    d2: PropTypes.object
};

export default SelectedPeriods;
