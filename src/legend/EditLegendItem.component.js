import React,{ PropTypes } from 'react';
import { legendItemStore$, onFieldChange, onFormStatusChange } from './LegendItem.store';
import { setDialogStateToAction } from './LegendItem.actions';
import withStateFrom from '../component-helpers/withStateFrom';
import FormBuilder from '../forms/FormBuilder.component';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('close');
config.i18n.strings.add('edit_legend_item');

// props, context
export function EditLegendItem({ fieldConfigs = [], open = false, onItemUpdate, isValid}, { d2 }) {
    const onClose = function() {
        setDialogStateToAction(false);
        onItemUpdate();
    }

    const actions = [
        <FlatButton
            label={d2.i18n.getTranslation('close')}
            primary={true}
            onTouchTap={onClose}
            disabled={!isValid}
        />,
    ];

    return (
        <Dialog
            title={d2.i18n.getTranslation('edit_legend_item')}
            modal={false}
            open={open}
            onRequestClose={onClose}
            actions={actions}
            autoScrollBodyContent={true}
        >

            <FormBuilder
                fields={fieldConfigs}
                onUpdateField={onFieldChange}
                onUpdateFormStatus={onFormStatusChange}
            />

        </Dialog>
    );
}
EditLegendItem.contextTypes = {
    d2: PropTypes.object,
};

export default withStateFrom(legendItemStore$, EditLegendItem);
