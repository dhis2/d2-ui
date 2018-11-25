import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import PeriodsList from './PeriodsList';

const Subtitle = () => (
    <div className="subtitle-container">
        <span className="subtitle"> {i18n.t('Selected periods')} </span>
    </div>
);

export const SelectedPeriods = ({ onClearAll, ...remaindingProps }) => (
    <div className="block-selected-periods">
        <Subtitle />
        <PeriodsList
            className="periods-list-selected"
            {...remaindingProps}
        />
        <div className="move-all-items-button">
            <Button
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => onClearAll(remaindingProps.items)}
            >
                {i18n.t('Deselect all')}
            </Button>
        </div>
    </div>
);

SelectedPeriods.propTypes = {
    items: PropTypes.array.isRequired,
    onClearAll: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onRemovePeriodClick: PropTypes.func.isRequired,
};

export default SelectedPeriods;
