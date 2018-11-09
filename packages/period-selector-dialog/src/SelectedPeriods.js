import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PeriodsList from './PeriodsList';
import i18n from '@dhis2/d2-i18n';

class SelectedPeriods extends React.Component {
    clearPeriods = () => {
        this.props.onClearAll(this.props.items);
    };

    render = () => (
        <div className="selector-area">
            <div className="subtitle-container">
                <span className="subtitle"> {i18n.t('Selected periods')} </span>
            </div>
            <PeriodsList
                items={this.props.items}
                onPeriodClick={this.props.onPeriodClick}
                onRemovePeriodClick={this.props.onRemovePeriodClick}
                listClassName={'periods-list-selected'}
            />
            <div style={{ textAlign: 'center' }}>
                <Button onClick={this.clearPeriods} >
                    {i18n.t('Clear all')}
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

export default SelectedPeriods;
