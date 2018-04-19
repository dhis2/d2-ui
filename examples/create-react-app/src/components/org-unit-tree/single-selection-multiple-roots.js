import React from 'react';
import { OrgUnitTreeMultipleRoots } from 'd2-ui-org-unit-tree';

export default class extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            selected: [],
        };

        this._selectionChanged = this._selectionChanged.bind(this);
    }

    _selectionChanged(event, selectedOu) {
        this.setState({
            selected: this.state.selected.includes(selectedOu.path) ? [] : [selectedOu.path],
        });
    }

    render() {
        return (
            <OrgUnitTreeMultipleRoots
                {...this.props}
                selected={this.state.selected}
                onSelectClick={this._selectionChanged}
            />
        );
    }
}
