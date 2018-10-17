import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
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

    onCloseClick = () => {
        this.props.onClose(this.state.periods);
    };

    onSelect = () => {
        this.props.onSelect(this.state.periods);
    };

    onDeselect = () => {
        this.props.onDeselect(this.state.periods);
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
                <DialogContent>
                    <PeriodSelector
                        onPeriodsSelect={this.onPeriodsSelect}
                        {...remaindingProps}
                    />
                </DialogContent>
                <DialogActions style={{ padding: '24px' }}>
                    <Button onClick={this.onCloseClick}>
                        {this.i18n.getTranslation('Hide')}
                    </Button>
                    <Button onClick={this.onUpdateClick} variant="contained" color="primary">
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
    onClose: () => null,
    onSelect: () => null,
    onDeselect: () => null,
    periods: [],
};

PeriodSelectorDialog.propTypes = {
    d2: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    periods: PropTypes.array,
};

export default PeriodSelectorDialog;
