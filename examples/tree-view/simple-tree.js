import React from 'react';
import TreeView from '../../src/tree-view';

export default class extends React.Component {
    render() {
        return (
            <TreeView label="Root 1">
                <TreeView label="Branch 1">
                    <div>Branch 1 Leaf 1</div>
                    <div>Branch 1 Leaf 2</div>
                    <div>Branch 1 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 2">
                    <div>Branch 2 Leaf 1</div>
                    <div>Branch 2 Leaf 2</div>
                    <div>Branch 2 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 3">
                    <div>Branch 3 Leaf 1</div>
                    <div>Branch 3 Leaf 2</div>
                    <div>Branch 3 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 4">
                    <div>Branch 4 Leaf 1</div>
                    <div>Branch 4 Leaf 2</div>
                    <div>Branch 4 Leaf 3</div>
                </TreeView>
            </TreeView>
        );
    }
}
