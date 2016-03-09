import React from 'react';
import TreeView from '../../src/tree-view';

export default class extends React.Component {
    render() {
        return (
            <TreeView label="Persistent Root" persistent initiallyExpanded>
                <TreeView label="Branch 1" initiallyExpanded>
                    <TreeView label="Sub-branch 1" initiallyExpanded>
                        <div>Leaf 1</div>
                        <div>Leaf 2</div>
                        <div>Leaf 3</div>
                    </TreeView>
                    <TreeView label="Sub-branch 2">
                        <div>Leaf 1</div>
                        <div>Leaf 2</div>
                        <div>Leaf 3</div>
                    </TreeView>
                    <TreeView label="Sub-branch 3" initiallyExpanded>
                        <div>Leaf 1</div>
                        <div>Leaf 2</div>
                        <div>Leaf 3</div>
                    </TreeView>
                </TreeView>
                <TreeView label="Branch 2" initiallyExpanded>
                    <div>Branch 2 Leaf 1</div>
                    <div>Branch 2 Leaf 2</div>
                    <div>Branch 2 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 3" initiallyExpanded>
                    <div>Branch 3 Leaf 1</div>
                    <div>Branch 3 Leaf 2</div>
                    <div>Branch 3 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 4" initiallyExpanded>
                    <div>Branch 4 Leaf 1</div>
                    <div>Branch 4 Leaf 2</div>
                    <div>Branch 4 Leaf 3</div>
                </TreeView>
            </TreeView>
        );
    }
}
