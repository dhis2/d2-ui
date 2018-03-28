import React from 'react';

import TreeView from '../../src/tree-view/TreeView.component';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this._handleClick = this._handleClick.bind(this);
    }

    render() {
        const selStyle = {
            borderTop: '1px solid #eeeeee',
            margin: '16px -16px 0',
            padding: '16px 16px 0',
        };
        return (
            <div>
                <OrgUnitTree
                    {...this.props}
                    onSelectClick={this._handleClick}
                    selected={this.state.selected}
                />
                <div style={selStyle}>
                    <TreeView label={`Selected: ${this.state.selected.length}`}>
                        <ul>{
                            this.state.selected
                                .sort()
                                .map(i => <li key={i}>{i}</li>)
                        }</ul>
                    </TreeView>
                </div>
            </div>
        );
    }

    _handleClick(event, orgUnit) {
        if (this.state.selected.includes(orgUnit.path)) {
            this.setState(state => {
                state.selected.splice(state.selected.indexOf(orgUnit.path), 1);
                return { selected: state.selected };
            });
        } else {
            this.setState(state => {
                state.selected.push(orgUnit.path);
                return { selected: state.selected };
            });
        }
    }

}
