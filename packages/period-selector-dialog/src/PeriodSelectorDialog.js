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

    render() {
        const { open, maxWidth, fullWidth } = this.props;

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
                        d2={this.props.d2}
                        periods={this.props.periods}
                        onPeriodsSelect={this.onPeriodsSelect}
                        listHeight={this.props.listHeight}
                    />
                </DialogContent>
                <DialogActions style={{ padding: '24px' }}>
                    <Button onClick={this.onCloseClick}>
                        {this.i18n.getTranslation('hide')}
                    </Button>
                    <Button onClick={this.onUpdateClick} variant="contained" color="primary">
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
    onClose: () => null,
    periods: [],
    listHeight: 320,
};

PeriodSelectorDialog.propTypes = {
    listHeight: PropTypes.number,
    periods: PropTypes.array,
    d2: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
};

export default PeriodSelectorDialog;
