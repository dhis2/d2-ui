import React from 'react';

import TreeView from '../../src/tree-view/TreeView.component';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

class MultipleSelectionExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChangeRoot = this.handleChangeRoot.bind(this);
    }

    handleClick(event, orgUnit) {
        if (this.state.selected.indexOf(orgUnit.id) >= 0) {
            this.setState(state => {
                state.selected.splice(state.selected.indexOf(orgUnit.id), 1);
                return {
                    selected: state.selected,
                };
            });
        } else {
            this.setState(state => {
                state.selected.push(orgUnit.id);
                return {
                    selected: state.selected,
                };
            });
        }
    }

    handleChangeRoot(ou) {
        this.setState({ currentRoot: ou });
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
                    currentRoot={this.state.currentRoot}
                    onChangeCurrentRoot={this.handleChangeRoot}
                />
                <div style={selStyle}>
                    <div>Current root: {this.state.currentRoot ? this.state.currentRoot.displayName : 'N/A'}</div>
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
