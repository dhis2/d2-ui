import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc';
import PeriodListItem from './PeriodListItem';

const SortableItem = SortableElement(({ period, idx, listClassName, ...handlerProps }) => (
    <PeriodListItem
        key={period.id}
        period={period}
        index={idx}
        listClassName={listClassName}
        {...handlerProps}
    />
));

const SortableList = SortableContainer(
    ({ items, listClassName, ...handlerProps }) => (
        <ul className={listClassName}>
            {items.map((period, index) => (
                <SortableItem
                    key={period.id}
                    period={period}
                    index={index}
                    idx={index}
                    listClassName={listClassName}
                    {...handlerProps}
                />
            ))}
        </ul>
    ));

class PeriodsList extends Component {
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onReorder(arrayMove(this.props.items, oldIndex, newIndex));
    }

    render() {
        const {
            items,
            sortable,
            listClassName,
            ...handlerProps
        } = this.props;

        if (sortable) {
            return (<SortableList
                distance={3}
                transitionDuration={200}
                onSortEnd={this.onSortEnd}
                items={items}
                listClassName={listClassName}
                {...handlerProps}
            />);
        }

        const ListItems = items.map((period, index) => (
            <PeriodListItem
                key={period.id}
                period={period}
                index={index}
                listClassName={listClassName}
                {...handlerProps}
            />
        ));

        return <ul className={listClassName}>{ListItems}</ul>;
    }
}

PeriodsList.propTypes = {
    items: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func,
    onRemovePeriodClick: PropTypes.func,
    onReorder: PropTypes.func,
    listClassName: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
};

PeriodsList.defaultProps = {
    onPeriodDoubleClick: Function.prototype,
    onRemovePeriodClick: Function.prototype,
    onReorder: Function.prototype,
};

export default PeriodsList;
