import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';

const style = {
    container: {
        marginRight: 55,
        display: 'flex',
        flexDirection: 'column',
        width: 420,
        height: 534,
        border: '1px solid #e0e0e0',
        position: 'relative',
    },
};

class ItemSelector extends Component {
    render() {
        const {
            unselected,
            selected,
            itemClassName,
            children: filterZone,
        } = this.props;

        return (
            <div style={{display: 'flex'}}>
                <div style={style.container}>
                    {filterZone}
                    <UnselectedItems
                        style={style.unselectedItems}
                        className={itemClassName}
                        {...unselected}
                    />
                </div>
                <SelectedItems className={itemClassName} {...selected} />
            </div>
        );
    }
}

ItemSelector.propTypes = {
    unselected: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        onSelect: PropTypes.func.isRequired,
        filterText: PropTypes.string,
        requestMoreItems: PropTypes.func,
    }),
    selected: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        dialogId: PropTypes.string,
        onDeselect: PropTypes.func.isRequired,
        onReorder: PropTypes.func.isRequired,
    }),
    itemClassName: PropTypes.string,
};

export default ItemSelector;
