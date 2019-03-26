import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

const PERIOD = 'PERIOD';

export class PeriodDimension extends Component {
    selectPeriods = periods => {
        const itemsToAdd = periods.reduce((array, item) => {
            array.push({ ...item, dimensionItemType: PERIOD });
            return array;
        }, []);

        this.props.onSelect({ dimensionType: peId, value: itemsToAdd });
    };

    deselectPeriods = periods => {
        const idsToRemove = periods.map(period => period.id);

        this.props.onDeselect({
            dimensionType: peId,
            value: idsToRemove,
        });
    };

    reorderPeriods = periods => {
        const ids = periods.map(period => period.id);

        this.props.onReorder({
            dimensionType: peId,
            value: ids,
        });
    };

    render = () => {
        const { selectedPeriods } = this.props;

        return (
            <Fragment>
                <DialogTitle>{i18n.t('Period')}</DialogTitle>
                <DialogContent>
                    <PeriodSelector
                        onSelect={this.selectPeriods}
                        onDeselect={this.deselectPeriods}
                        onReorder={this.reorderPeriods}
                        selectedItems={selectedPeriods}
                    />
                </DialogContent>
            </Fragment>
        );
    };
}

PeriodDimension.propTypes = {
    d2: PropTypes.object,
    selectedPeriods: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
};

PeriodDimension.defaultProps = {
    selectedPeriods: [],
};

export default PeriodDimension;
