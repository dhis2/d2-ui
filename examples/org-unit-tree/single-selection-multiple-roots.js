import React from 'react';
import OrgUnitTree from '../../src/org-unit-tree';

export default class extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            selected: [],
        };
    }

    render() {
        return (
            <OrgUnitTree {...this.props} selected={this.state.selected} onClick={this._selectionChanged.bind(this)} />
        );
    }

    _selectionChanged(event, selectedOu) {
        this.setState({
            selected: selectedOu.id,
        });
    }
}
