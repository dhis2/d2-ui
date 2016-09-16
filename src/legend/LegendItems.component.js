import React, {  Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
        const model = this.context.d2.models.legend.create();
        model.color = '#FFA500'; // Orange is default

        openEditDialogFor(model);
    }

    render() {
        const props = this.props;

        const actions = {
            edit: openEditDialogFor,
            delete: props.deleteItem,
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

        const orderedItems = props.items.sort((left, right) => Number(left.startValue) > Number(right.startValue));

        return (
            <div style={styles.component}>
                <FloatingActionButton style={styles.button} onClick={this.onAddLegendItem}>
                    <ContentAdd />
                </FloatingActionButton>

                <DataTable
                    rows={orderedItems}
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

LegendItems.propTypes = {
    items: PropTypes.array.isRequired,
};
