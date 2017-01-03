import React from 'react';

import TreeView from '../../src/tree-view/TreeView.component';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

import { mergeChildren, incrementMemberCount, decrementMemberCount } from '../../src/org-unit-tree/utils';

class MultipleSelectionExample extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: [],
        };

        Promise.all([
            d2.models.organisationUnits.list({
                paging: false,
                level: 1,
                fields: 'id,path,displayName,children::isNotEmpty,path,memberCount',
                memberCollection: props.memberCollection,
                memberObject: props.memberObject,
            }),
            d2.models[props.memberCollection].get(props.memberObject, {
                fields: 'displayName,organisationUnits[id,path]'
            }),
        ])
            .then(([root, memberObject]) => this.setState({
                root: root.toArray()[0],
                selected: memberObject.organisationUnits.toArray().map(ou => ou.path),
                objectName: memberObject.displayName,
            }));

        this.handleClick = this.handleClick.bind(this);
        this.handleLoadChildren = this.handleLoadChildren.bind(this);
    }

    handleClick(event, orgUnit) {
        if (this.state.selected.includes(orgUnit.path)) {
            // decrementMemberCount(this.state.root, orgUnit);

            this.setState(state => {
                state.selected.splice(state.selected.indexOf(orgUnit.path), 1);
                return { selected: state.selected };
            });
        } else {
            // incrementMemberCount(this.state.root, orgUnit);

            this.setState(state => {
                state.selected.push(orgUnit.path);
                return { selected: state.selected };
            });
        }
    }

    handleLoadChildren(children) {
        // Modifying the state directly is a dirty hack. Instead, the handleLoadChildren callback should be placed
        // where the org unit tree is managed
        mergeChildren(this.state.root, children);
    }

    render() {
        const selStyle = {
            borderTop: '1px solid #eeeeee',
            margin: '16px -16px 0',
            padding: '16px 16px 0',
        };
        return this.state.root ? (
                <div>
                    <OrgUnitTree
                        root={this.state.root}
                        onSelectClick={this.handleClick}
                        selected={this.state.selected}
                        memberCollection={this.props.memberCollection}
                        memberObject={this.props.memberObject}
                        onChildrenLoaded={this.handleLoadChildren}
                    />
                    <div style={selStyle}>
                        Member object: {this.state.objectName}
                        <TreeView label={`Selected: ${this.state.selected.length}`}>
                            <ul>{
                                this.state.selected
                                    .sort()
                                    .map(i => <li key={i}>{i}</li>)
                            }</ul>
                        </TreeView>
                    </div>
                </div>
            ) : <div>Loading...</div>;
    }
}

MultipleSelectionExample.propTypes = {
    memberCollection: React.PropTypes.string.isRequired,
    memberObject: React.PropTypes.string.isRequired,
};

export default MultipleSelectionExample;
