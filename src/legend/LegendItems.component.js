import React, {  Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import DataTable from '../../src/data-table/DataTable.component';
import { legendItemStore$, openEditDialogFor } from './LegendItem.store';
import { setDialogStateToAction } from './LegendItem.actions';
import withStateFrom from '../component-helpers/withStateFrom';
import FormBuilder from '../forms/FormBuilder.component';

const EditDialog = withStateFrom(legendItemStore$, function (props) {
    console.log(props);
    return (
        <Dialog
            title='Edit legend item'
            //actions={actions}
            modal={false}
            open={props.open}
            onRequestClose={() => setDialogStateToAction(false)}
        >
            <FormBuilder fields={props.fieldConfigs} />
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
                <DataTable
                    rows={props.items}
                    columns={['name', 'startValue', 'endValue', 'color']}
                    primaryAction={() => {}}
                    contextMenuActions={actions}
                />

                <EditDialog />
            </div>
        );
    }
}

export default function LegendItems (props) {
};

LegendItems.propTypes = {
    items: PropTypes.array.isRequired,
};
