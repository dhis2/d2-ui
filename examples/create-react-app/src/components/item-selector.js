import React, { Component } from 'react';

import Selector from '@dhis2/d2-ui-item-selector';

const style = {};

const items = [
    {
        id: 'rarity',
        name: 'Rarity',
    },
    {
        id: 'rainbow',
        name: 'Rainbow Dash',
    },
    {
        id: 'fluttershy',
        name: 'Fluttershy',
    },
    {
        id: 'pinkie',
        name: 'Pinkie Pie',
    },
    {
        id: 'applejack',
        name: 'Applejack',
    },
    {
        id: 'spike',
        name: 'Spike',
    },
];

class ItemSelector extends Component {
    state = {
        unselectedItems: items.map(i => i.id),
        selectedItems: []
    }

    onSelect = newItems => {
        const selectedItems = [...(new Set(newItems.concat(this.state.selectedItems)))];
        const unselectedItems = items
            .map(item => item.id)
            .filter(id => !selectedItems.includes(id));

        this.setState({selectedItems, unselectedItems})
    }

    onDeselect = newItems => {
        const unselectedItems = [...(new Set(newItems.concat(this.state.unselectedItems)))];
        const selectedItems = items
            .map(item => item.id)
            .filter(id => !unselectedItems.includes(id));

            this.setState({selectedItems, unselectedItems})
    }

    render() {
        const unselected = {
            items: items.filter(i => this.state.unselectedItems.includes(i.id)),
            onSelect: this.onSelect
        };

        const selected = {
            items: items.filter(i => this.state.selectedItems.includes(i.id)),
            onDeselect: this.onDeselect,
            onReorder: this.onSelect,
        }
        return (
            <div style={style}>
                <Selector unselected={unselected} selected={selected}/>
            </div>
        );
    }
}

export default ItemSelector;
