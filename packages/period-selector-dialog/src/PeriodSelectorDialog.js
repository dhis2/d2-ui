import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import PeriodSelector from './PeriodSelector';

const styles = {
    dialogContent: {
        overflow: 'hidden', // TODO: Reflow DOM or enforce minimum dialog sizing rather than hiding important UI elements on small screens
    },
};

class PeriodSelectorDialog extends React.Component {
    onCloseClick = () => {
        this.props.onClose();
    };

    onUpdateClick = () => {
        this.props.onUpdate(this.props.selectedItems);
    };

    onSelect = (selectedPeriods) => {
        this.props.onSelect(selectedPeriods);
    };

    onDeselect = (removedPeriods) => {
        const selectedPeriods = this.props.selectedItems.filter(period =>
            !removedPeriods.includes(period) && period,
        );

        this.props.onDeselect(selectedPeriods);
    };

    render = () => {
        const { classes, open, maxWidth, fullWidth, ...rest } = this.props;

        return (
            <Dialog
                open={open}
                onClose={this.onCloseClick}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>{i18n.t('Period')}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <PeriodSelector {...rest} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.onCloseClick}>
                        {i18n.t('Hide')}
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.onUpdateClick}>
                        {i18n.t('Update')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

PeriodSelectorDialog.defaultProps = {
    maxWidth: 'md',
    fullWidth: true,
    onSelect: () => null,
    onDeselect: () => null,
    selectedItems: [],
};

PeriodSelectorDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    selectedItems: PropTypes.array,
};

export default withStyles(styles)(PeriodSelectorDialog);
