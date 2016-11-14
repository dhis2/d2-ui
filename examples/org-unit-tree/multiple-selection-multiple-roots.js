import React from 'react';

import TreeView from '../../src/tree-view';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this._handleClick = this._handleClick.bind(this);
        this._handleChangeRoot = this._handleChangeRoot.bind(this);
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
                    onClick={this._handleClick}
                    selected={this.state.selected}
                    currentRoot={this.state.currentRoot}
                    onChangeCurrentRoot={this._handleChangeRoot}
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

    _handleChangeRoot(orgUnit) {
        this.setState({ currentRoot: orgUnit });
    }

    _handleClick(event, orgUnit) {
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

}
