import React from 'react';
import TreeView from '../../src/tree-view/TreeView.component';

export default class extends React.Component {
    handleClick(e) {
        e.target.parentElement.getElementsByClassName('arrow')[0].click();
    }

    render() {
        return (
            <TreeView label="Root 1" onClick={this.handleClick}>
                <TreeView label="Branch 1" onClick={this.handleClick}>
                    <div>Branch 1 Leaf 1</div>
                    <div>Branch 1 Leaf 2</div>
                    <div>Branch 1 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 2" onClick={this.handleClick}>
                    <div>Branch 2 Leaf 1</div>
                    <div>Branch 2 Leaf 2</div>
                    <div>Branch 2 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 3" onClick={this.handleClick}>
                    <div>Branch 3 Leaf 1</div>
                    <div>Branch 3 Leaf 2</div>
                    <div>Branch 3 Leaf 3</div>
                </TreeView>
                <TreeView label="Branch 4" onClick={this.handleClick}>
                    <div>Branch 4 Leaf 1</div>
                    <div>Branch 4 Leaf 2</div>
                    <div>Branch 4 Leaf 3</div>
                </TreeView>
            </TreeView>
        );
    }
}
