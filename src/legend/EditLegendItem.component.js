import PropTypes from 'prop-types';
import React from 'react';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Dialog from 'material-ui/Dialog/Dialog';
import { config } from 'd2/lib/d2';
import { legendItemStore, legendItemStore$, onFieldChange, onFormStatusChange } from './LegendItem.store';
import { setDialogStateToAction } from './LegendItem.actions';
import withStateFrom from '../component-helpers/withStateFrom';
import FormBuilder from '../forms/FormBuilder.component';

config.i18n.strings.add('ok');
config.i18n.strings.add('cancel');
config.i18n.strings.add('edit_legend_item');

function isCloseDisabled(isValid) {
    const model = legendItemStore.getState() && legendItemStore.getState().model;

    if (model && (model.startValue === undefined || model.endValue === undefined || model.name === undefined)) {
        return true;
    }

    if (model && !model.dirty) {
        return false;
    }

    return !isValid;
}

// props, context
export function EditLegendItem({ fieldConfigs = [], open = false, onItemUpdate, isValid }, { d2 }) {
    const onCancel = () => {
        setDialogStateToAction(false);
    };

    const onClose = () => {
        setDialogStateToAction(false);
        onItemUpdate();
    };

    const actions = [
        <FlatButton
            label={d2.i18n.getTranslation('cancel')}
            secondary
            onClick={onCancel}
        />,
        <FlatButton
            label={d2.i18n.getTranslation('ok')}
            primary
            onClick={onClose}
            disabled={isCloseDisabled(isValid)}
        />,
    ];

    return (
        <Dialog
            title={d2.i18n.getTranslation('edit_legend_item')}
            modal
            open={open}
            onRequestClose={onClose}
            actions={actions}
            autoScrollBodyContent
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
