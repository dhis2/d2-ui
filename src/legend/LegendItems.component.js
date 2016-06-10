import React, {  Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DataTable from '../data-table/DataTable.component';
import EditLegendItem from './EditLegendItem.component';
import { openEditDialogFor } from './LegendItem.store';

export default class LegendItems extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            editDialogOpen: false,
        };
    }

    onAddLegendItem = () => {
        //const model = this.context.d2.models.legend.create();

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
            component: {
                position: 'relative',
            },
            button: {
                float: 'right',
                position: 'absolute',
                right: 20,
                top: -29,
            }
        };

        return (
            <div style={styles.component}>
                <FloatingActionButton style={styles.button} onClick={this.onAddLegendItem}>
                    <ContentAdd />
                </FloatingActionButton>

                <DataTable
                    rows={props.items}
                    columns={['name', 'startValue', 'endValue', 'color']}
                    primaryAction={() => {}}
                    contextMenuActions={actions}
                />

                <EditLegendItem onItemUpdate={() => props.updateItem(props.items)} />
            </div>
        );
    }
}

LegendItems.contextTypes = {
    d2: PropTypes.object,
};

export default function LegendItems (props) {};

LegendItems.propTypes = {
    items: PropTypes.array.isRequired,
};
