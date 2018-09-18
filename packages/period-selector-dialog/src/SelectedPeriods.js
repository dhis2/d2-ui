import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PeriodsList from './PeriodsList';

class SelectedPeriods extends React.Component {
    constructor(props, context) {
        super(props);

        this.i18n = context.d2.i18n;
    }

    clearPeriods = () => {
        this.props.addOfferedPeriods(this.props.periods);
        this.props.setSelectedPeriods([]);
    };

    render() {
        return (<div className="selector-area">
            <h4 className="title">
                {this.i18n.getTranslation('Selected periods')}
            </h4>
            <PeriodsList
                periods={this.props.periods}
                onPeriodClick={this.props.onPeriodClick}
            />
            <div style={{ textAlign: 'center' }}>
                <Button onClick={this.clearPeriods}>{this.i18n.getTranslation('Clear all')}</Button>
            </div>
        </div>);
    }
}

SelectedPeriods.propTypes = {
    periods: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    setSelectedPeriods: PropTypes.func.isRequired,
    addOfferedPeriods: PropTypes.func.isRequired,
};

SelectedPeriods.contextTypes = {
    d2: PropTypes.object,
};

export default SelectedPeriods;
