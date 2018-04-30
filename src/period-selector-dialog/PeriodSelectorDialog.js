import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogActions,
} from 'material-ui-next/Dialog';
import { Button } from 'material-ui-next';
import PeriodSelector from './PeriodSelector';

class PeriodSelectorDialog extends React.Component {
    render() {
        const { open, onClose } = this.props;
        const handleOnPeriodConfirm = () => {
            onClose();
        };

        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>Period</DialogTitle>
                <DialogContent>
                    <PeriodSelector/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Hide
                    </Button>
                    <Button onClick={handleOnPeriodConfirm} color={'primary'}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        );

    }
}

export default PeriodSelectorDialog;
