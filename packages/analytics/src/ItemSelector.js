import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';
import styles from './styles/ItemSelector.style';

class ItemSelector extends Component {
    render() {
        const {
            unselected,
            selected,
            children: filterZone,
        } = this.props;

        return (
            <div className="item-selector-container">
                <div className={cx('section', 'unselected')}>
                    {filterZone}
                    <UnselectedItems
                        {...unselected}
                    />
                </div>
                <div className={cx('section', 'selected')}>
                    <SelectedItems {...selected} />
                </div>
                <style jsx>{styles}</style>
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
};

export default ItemSelector;
