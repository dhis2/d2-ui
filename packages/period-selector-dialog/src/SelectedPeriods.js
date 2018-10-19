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
        this.props.onClearAll(this.props.items);
    };

    render = () => (
        <div className="selector-area">
            <div className="subtitle-container">
                <span className="subtitle"> {this.i18n.getTranslation('Selected periods')} </span>
            </div>
            <PeriodsList
                items={this.props.items}
                onPeriodClick={this.props.onPeriodClick}
                onRemovePeriodClick={this.props.onRemovePeriodClick}
                listClassName={'periods-list-selected'}
            />
            <div style={{ textAlign: 'center' }}>
                <Button onClick={this.clearPeriods} >
                    {this.i18n.getTranslation('Clear all')}
                </Button>
            </div>
        </div>
    )
}

SelectedPeriods.propTypes = {
    items: PropTypes.array.isRequired,
    onClearAll: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onRemovePeriodClick: PropTypes.func.isRequired,
};

SelectedPeriods.contextTypes = {
    d2: PropTypes.object,
};

export default SelectedPeriods;
