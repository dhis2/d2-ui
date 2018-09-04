import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import PeriodSelector from './PeriodSelector';

export const defaultState = {
    periods: [],
};

class PeriodSelectorDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.i18n = this.props.d2.i18n;
    }

    onPeriodsSelect = (periods) => {
        this.setState({
            periods,
        });
    };

    onUpdateClick = () => {
        this.props.onUpdate(this.state.periods);
    };

    render() {
        const { open, onClose, maxWidth, fullWidth } = this.props;

        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>{this.i18n.getTranslation('Period')}</DialogTitle>
                <DialogContent>
                    <PeriodSelector d2={this.props.d2}
                                    onPeriodsSelect={this.onPeriodsSelect}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        {this.i18n.getTranslation('hide')}
                    </Button>
                    <Button onClick={this.onUpdateClick} color={'primary'}>
                        {this.i18n.getTranslation('update')}
                    </Button>
                </DialogActions>
            </Dialog>
        );

    }
}

PeriodSelectorDialog.defaultProps = {
    maxWidth: 'md',
    fullWidth: true,
};

PeriodSelectorDialog.propTypes = {
    d2: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
};

export default PeriodSelectorDialog;
