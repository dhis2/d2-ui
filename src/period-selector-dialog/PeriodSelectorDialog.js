import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogActions,
} from 'material-ui-next/Dialog';
import { Button } from 'material-ui-next';
import PeriodSelector from './PeriodSelector';

export const defaultState = {
    periods: [],
};

class PeriodSelectorDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
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
                <DialogTitle>Period</DialogTitle>
                <DialogContent>
                    <PeriodSelector onPeriodsSelect={this.onPeriodsSelect}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Hide
                    </Button>
                    <Button onClick={this.onUpdateClick} color={'primary'}>
                        Update
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
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
};

export default PeriodSelectorDialog;
