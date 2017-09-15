import React from 'react';
import { findDOMNode } from 'react';
import IconButton from 'material-ui/IconButton/IconButton';
import log from 'loglevel';
import GroupEditor from './GroupEditor.component';

function moveItemOneSpotDownIn(currentlySelected) {
    return (itemToFind) => {
        const indexOfItem = Array.prototype.findIndex.call(currentlySelected, item => item === itemToFind);

        // Can only move the item when the indexOfItem does not refer to the last item
        if (indexOfItem < (currentlySelected.length - 1)) {
            // Swap the item in the list
            const tempItem = currentlySelected[indexOfItem + 1];
            currentlySelected[indexOfItem + 1] = currentlySelected[indexOfItem];
            currentlySelected[indexOfItem] = tempItem;
        }
    };
}

function moveItemOneSpotUpIn(currentlySelected) {
    return (itemToFind) => {
        const indexOfItem = Array.prototype.findIndex.call(currentlySelected, item => item === itemToFind);

        // Can only move the item when the indexOfItem does not refer to the first item
        if (indexOfItem > 0) {
            // Swap the item in the list
            const tempItem = currentlySelected[indexOfItem - 1];
            currentlySelected[indexOfItem - 1] = currentlySelected[indexOfItem];
            currentlySelected[indexOfItem] = tempItem;
        }
    };
}

export default class GroupEditorWithOrdering extends React.Component {
    render() {
        return (
            <div style={{ paddingRight: '2.5rem', position: 'relative' }}>
                <GroupEditor ref={(r) => { this.groupEditor = r; }} {...this.props} />
                <div style={{ width: '2.5rem', position: 'absolute', top: '45%', right: 0 }}>
                    <IconButton
                        style={{ color: 'rgb(33, 150, 243)' }}
                        iconClassName="material-icons"
                        tooltip="Move up"
                        onClick={this.moveUp.bind(this)}
                    >arrow_upward</IconButton>
                    <IconButton
                        style={{ color: 'rgb(33, 150, 243)' }}
                        iconClassName="material-icons"
                        tooltip="Move down"
                        onClick={this.moveDown.bind(this)}
                    >arrow_downward</IconButton>
                </div>
            </div>
        );
    }

    moveUp() {
        if (!Array.isArray(this.props.assignedItemStore.getState())) {
            return log.warn('Moving in <GroupEditorWithOrdering /> is not supported (yet) when the assignedItemStore\'s state is a ModelCollectionProperty');
        }

        const currentlySelected = Array.from(this.props.assignedItemStore.getState());
        const itemsToMoveUp = this.groupEditor.getSelectedItems();

        itemsToMoveUp
            .forEach(moveItemOneSpotUpIn(currentlySelected));

        // Emit the changed order to the event handler
        this.props.onOrderChanged(currentlySelected);
    }

    moveDown() {
        if (!Array.isArray(this.props.assignedItemStore.getState())) {
            return log.warn('Moving in <GroupEditorWithOrdering /> is not supported (yet) when the assignedItemStore\'s state is a ModelCollectionProperty');
        }

        const currentlySelected = Array.from(this.props.assignedItemStore.getState());
        const itemsToMoveDown = this.groupEditor.getSelectedItems();

        itemsToMoveDown
            .reverse() // Reverse the list to move the items lower in the list first
            .forEach(moveItemOneSpotDownIn(currentlySelected));

        // Emit the changed order to the event handler
        this.props.onOrderChanged(currentlySelected);
    }
}
GroupEditorWithOrdering.propTypes = {
    onOrderChanged: React.PropTypes.func,
};
GroupEditorWithOrdering.defaultProps = {
    onOrderChanged: () => {},
};
