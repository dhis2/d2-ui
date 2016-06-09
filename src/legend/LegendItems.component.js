import React, {  Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DataTable from '../data-table/DataTable.component';
import { legendItemStore$, openEditDialogFor, onFieldChange } from './LegendItem.store';
import { setDialogStateToAction } from './LegendItem.actions';
import withStateFrom from '../component-helpers/withStateFrom';
import FormBuilder from '../forms/FormBuilder.component';

// TODO: Separate component
const EditDialog = withStateFrom(legendItemStore$, function ({ fieldConfigs = [], open = false, onItemUpdate }) {
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

export default class LegendItems extends Component {
    constructor() {
        super();

        this.state = {
            editDialogOpen: false,
        };
    }

    onAddLegendItem = () => {
        const model = this.context.d2.models.legend.create();

        openEditDialogFor(this.context.d2.models.legend.create());
    }

    render() {
        const props = this.props;

        const actions = {
            edit: (model) => {
                openEditDialogFor(model);
            },
            delete: (v) => {
                const newList = props.items.filter(model => model.id !== v.id);
                props.updateItem(newList);
            },
        };

        const styles = {
            paddingTop: 20,
        };

        return (
            <div style={styles}>
                <FloatingActionButton onClick={this.onAddLegendItem}>
                    <ContentAdd />
                </FloatingActionButton>

                <DataTable
                    rows={props.items}
                    columns={['name', 'startValue', 'endValue', 'color']}
                    primaryAction={() => {}}
                    contextMenuActions={actions}
                />

                <EditDialog onItemUpdate={() => props.updateItem(props.items)} />
            </div>
        );
    }
}
LegendItems.contextTypes = {
    d2: PropTypes.object,
};

export default function LegendItems (props) {
};

LegendItems.propTypes = {
    items: PropTypes.array.isRequired,
};
