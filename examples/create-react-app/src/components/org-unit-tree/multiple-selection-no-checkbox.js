import React from 'react';

import { OrgUnitTree } from 'd2-ui-org-unit-tree';
import { TreeView } from 'd2-ui-core';

class MultipleSelectionExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, orgUnit) {
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

    render() {
        const selStyle = {
            borderTop: '1px solid #eeeeee',
            margin: '16px -16px 0',
            padding: '16px 16px 0',
        };
        return (
            <div>
                <OrgUnitTree
                    root={this.props.root}
                    onSelectClick={this.handleClick}
                    selected={this.state.selected}
                    hideCheckboxes
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
}

export default MultipleSelectionExample;
