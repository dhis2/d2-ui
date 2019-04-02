import React, { Component } from 'react';

import {ItemSelector} from '@dhis2/d2-ui-analytics';

const style = {
    fontFamily: 'Roboto',
};

const items = {
    rarity: {
        id: 'rarity',
        name: 'Rarity',
    },
    rainbow: {
        id: 'rainbow',
        name: 'Rainbow Dash',
    },
    fluttershy: {
        id: 'fluttershy',
        name: 'Fluttershy is a little yellow horse with pink mane and tail',
    },
    pinkie: {
        id: 'pinkie',
        name: 'Pinkie Pie',
    },
    applejack: {
        id: 'applejack',
        name: 'Applejack',
    },
    spike: {
        id: 'spike',
        name: 'Spike',
    },
};

class ItemSelectorExample extends Component {
    state = {
        unselectedItems: Object.keys(items),
        selectedItems: []
    }

    onSelect = newItems => {
        const selectedItems = [...(new Set(newItems.concat(this.state.selectedItems)))];
        const unselectedItems = Object.keys(items)
            .filter(id => !selectedItems.includes(id));

        this.setState({selectedItems, unselectedItems})
    }

    onDeselect = newItems => {
        const unselectedItems = [...(new Set(newItems.concat(this.state.unselectedItems)))];
        const selectedItems = Object.keys(items)
            .filter(id => !unselectedItems.includes(id));

            this.setState({selectedItems, unselectedItems})
    }

    onReorder = selectedItems => {
        this.setState({selectedItems});
    }

    render() {
        const unselected = {
            items: this.state.unselectedItems.map(id => items[id]),
            onSelect: this.onSelect
        };

        const selected = {
            items: this.state.selectedItems.map(id => items[id]),
            onDeselect: this.onDeselect,
            onReorder: this.onReorder,
        }

        return (
            <div style={style}>
                <ItemSelector unselected={unselected} selected={selected}/>
            </div>
        );
    }
}

export default ItemSelectorExample;
