import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UnselectedItems from './UnselectedItems'
import SelectedItems from './SelectedItems'

const styles = {
    itemSelectorContainer: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 1 auto',
        fontFamily: 'Roboto, sans-serif',
    },
    section: {
        border: '1px solid #e8edf2',
        display: 'flex',
        flexDirection: 'column',
        height: '480px',
        position: 'relative',
    },
    unselected: {
        marginRight: '55px',
        width: '418px',
    },
    selected: {
        width: '276px',
    }
}

class ItemSelector extends Component {
    render() {
        const {
            unselected,
            selected,
            children: filterZone,
        } = this.props

        const unselectedStyle = Object.assign({}, styles.section, styles.unselected)
        const selectedStyle = Object.assign({}, styles.section, styles.selected)

        return (
            <div style={styles.itemSelectorContainer}>
                <div style={unselectedStyle}>
                    {filterZone}
                    <UnselectedItems {...unselected} />
                </div>
                <div style={selectedStyle}>
                    <SelectedItems {...selected} />
                </div>
            </div>
        )
    }
}

ItemSelector.propTypes = {
    children: PropTypes.object,
    selected: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                isActive: PropTypes.bool,
            })
        ).isRequired,
        onDeselect: PropTypes.func.isRequired,
        onReorder: PropTypes.func.isRequired,
        dialogId: PropTypes.string,
        infoBoxMessage: PropTypes.string,
    }),
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
}

export default ItemSelector
