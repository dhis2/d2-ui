import React from 'react';
import PropTypes from 'prop-types';
import PeriodsList from './PeriodsList';

class SelectedPeriods extends React.Component {
    constructor(props, context) {
        super(props);

        this.i18n = context.d2.i18n;
    }

    render() {
        return (<div className="selector-area">
            <h4 className="title">
                {this.i18n.getTranslation('Selected periods')}
            </h4>
            <PeriodsList periods={this.props.periods} onPeriodClick={this.props.onPeriodClick} />
        </div>);
    }
}

SelectedPeriods.propTypes = {
    periods: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

SelectedPeriods.contextTypes = {
    d2: PropTypes.object,
};

export default SelectedPeriods;
