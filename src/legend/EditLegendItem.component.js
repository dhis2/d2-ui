import { legendItemStore$, openEditDialogFor, onFieldChange } from './LegendItem.store';
import { setDialogStateToAction } from './LegendItem.actions';
import withStateFrom from '../component-helpers/withStateFrom';

export default EditLegendItem = withStateFrom(legendItemStore$, function ({ fieldConfigs = [], open = false, onItemUpdate }) {
    const onClose = function() {
        setDialogStateToAction(false);
        onItemUpdate();
    }

    const actions = [
        <FlatButton
            label="Close"
            primary={true}
            onTouchTap={onClose}
        />,
    ];

    return (
        <Dialog
            title='Edit legend item'
            modal={false}
            open={open}
            onRequestClose={onClose}
            actions={actions}
        >
            <FormBuilder fields={fieldConfigs} onUpdateField={onFieldChange} />

        </Dialog>
    );
});
