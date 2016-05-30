import React, { PropTypes } from 'react';
import DataTable from '../../src/data-table/DataTable.component';

function updateItem(items) {
    return items.map((model, index) => {
        if (index === 0) {
            model.name = 'Hello';
        }
        return model;
    });
}

export default function LegendItems (props) {
    const actions = {
        edit: (v) => props.updateItem(updateItem(props.items)),
        delete: (v) => {
            const newList = props.items.filter(model => model.id !== v.id);
            props.updateItem(newList);
        },
    }

    return (
        <DataTable
            rows={props.items}
            columns={['name', 'startValue', 'endValue', 'color']}
            primaryAction={() => {}}
            contextMenuActions={actions}
        />
        // Insert edit popup here (model, callback)
    );
};
LegendItems.propTypes = {
    items: PropTypes.array.isRequired,
};
