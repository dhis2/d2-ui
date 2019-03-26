import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ItemSelector from '../ItemSelector/ItemSelector';

import FilterField from '../FilterField';

import { apiFetchItemsByDimension } from '../../api/dimensions';

import { styles } from './styles/DynamicDimension.style';

export class DynamicDimension extends Component {
    state = {
        filterText: '',
        nextPage: null,
        items: [],
        unselectedIds: [],
        selectedIds: [],
    };

    componentDidMount = async () => {
        const items = await apiFetchItemsByDimension(
            this.props.d2,
            this.props.dialogId
        );

        this.setState({ items });
    };

    onClearFilter = () => {
        this.setState({ filterText: '' });
    };

    onFilterTextChange = filterText => {
        const filteredItems = this.state.items.map(
            item =>
                item.name.toLowerCase().includes(filterText.toLowerCase()) &&
                item.id
        );

        this.setState({
            filterText,
            unselectedIds: filteredItems,
        });
    };

    selectItemsByDimensions = selectedIds => {
        const unselectedIds = this.state.unselectedIds.filter(
            id => !selectedIds.includes(id)
        );
        this.setState({ unselectedIds });

        const itemsToAdd = 
            this.state.items.filter(di => selectedIds.includes(di.id));

        this.props.onSelect({
            dimensionType: this.props.dialogId,
            value: itemsToAdd,
        });
    };

    deselectItemsByDimensions = ids => {
        const unselectedIds = [
            ...new Set([...this.state.unselectedIds, ...ids]),
        ];
        this.setState({ unselectedIds });

        this.props.onDeselect({
            dimensionType: this.props.dialogId,
            value: ids,
        });
    };

    getUnselectedItems = () =>
        this.state.items.filter(
            item => !this.props.selectedItems.includes(item.id)
        );

    setUiItems = items =>
        this.props.onReorder({
            dimensionType: this.props.dialogId,
            value: items,
        });

    render = () => {
        const filterZone = () => {
            return (
                <FilterField
                    text={this.state.filterText}
                    onFilterTextChange={this.onFilterTextChange}
                    onClearFilter={this.onClearFilter}
                />
            );
        };

        const unselected = {
            items: this.getUnselectedItems(),
            onSelect: this.selectItemsByDimensions,
            filterText: this.state.filterText,
        };

        const selected = {
            items: this.props.selectedItems,
            dialogId: this.props.dialogId,
            onDeselect: this.deselectItemsByDimensions,
            onReorder: this.setUiItems,
        };

        return (
            <Fragment>
                <DialogTitle>{this.props.dialogTitle}</DialogTitle>
                <DialogContent style={styles.dialogContent}>
                    <ItemSelector
                        itemClassName="dynamic-dimension"
                        unselected={unselected}
                        selected={selected}
                    >
                        {filterZone()}
                    </ItemSelector>
                </DialogContent>
            </Fragment>
        );
    };
}

DynamicDimension.propTypes = {
    d2: PropTypes.object.isRequired,
    dialogId: PropTypes.string.isRequired,
    dialogTitle: PropTypes.stringi.isRequired,
    selectedItems: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
};

DynamicDimension.defaultProps = {
    selectedItems: [],
    onSelect: Function.prototype,
    onDeselect: Function.prototype,
    onReorder: Function.prototype,
};

export default DynamicDimension;
