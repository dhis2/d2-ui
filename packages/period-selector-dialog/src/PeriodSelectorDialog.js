import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PeriodSelector from './PeriodSelector';

const styles = {
    dialogContent: {
        paddingBottom: 0,
        paddingTop: 0,
        overflow: 'hidden',
    },
};

class PeriodSelectorDialog extends React.Component {
    constructor(props) {
        super(props);

        this.i18n = this.props.d2.i18n;
    }

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
        const { open, maxWidth, fullWidth, ...remaindingProps } = this.props;

        return (
            <Dialog
                open={open}
                onClose={this.onCloseClick}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>{this.i18n.getTranslation('Period')}</DialogTitle>
                <DialogContent style={styles.dialogContent}>
                    <PeriodSelector {...remaindingProps} />
                </DialogContent>
                <DialogActions style={styles.dialogActions}>
                    <Button color="primary" onClick={this.onCloseClick}>
                        {this.i18n.getTranslation('Hide')}
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.onUpdateClick}>
                        {this.i18n.getTranslation('Update')}
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
    d2: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    selectedItems: PropTypes.array,
};

export default PeriodSelectorDialog;
