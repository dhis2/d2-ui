import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import PeriodsList from './PeriodsList';

class SelectedPeriods extends React.Component {
    onReorder = (periods) => {
        this.props.onReorder(periods);
    }

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
                onPeriodDoubleClick={this.props.onPeriodDoubleClick}
                onRemovePeriodClick={this.props.onRemovePeriodClick}
                onReorder={this.onReorder}
                listClassName={'periods-list-selected'}
                sortable
            />
            <div style={{ textAlign: 'center' }}>
                <Button onClick={this.clearPeriods} >
                    {i18n.t('Deselect all')}
                </Button>
            </div>
        </div>
    )
}

SelectedPeriods.propTypes = {
    items: PropTypes.array.isRequired,
    onClearAll: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onRemovePeriodClick: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
};

export default SelectedPeriods;
