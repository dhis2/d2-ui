import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import ItemIcon from './ItemIcon'
import DeselectIconButton from './DeselectIconButton'
import styles from './styles/SelectedItem.style'

const colors = {
    white: '#fff'
}

const theme = {
    secondary600: '#00796b',
}


const onClickWrapper = ({ id, index, onClick }) => event =>
    onClick({
        isCtrlPressed: event.metaKey || event.ctrlKey,
        isShiftPressed: event.shiftKey,
        index,
        id,
    })

export const Item = ({
    name,
    highlighted,
    ghost,
    active,
    onRemoveItem,
    ...rest
}) => {
    const itemStyle = Object.assign({}, styles.item, ghost && styles.ghost, highlighted && styles.highlightedItem, !highlighted && styles.selectedItem, !active && styles.inactiveItem)
    const itemLabelStyle = Object.assign({}, styles.itemLabel, highlighted && styles.highlightedText)
    return (
        <div
            className={cx('selected-period-item', highlighted && 'highlighted')}
            style={itemStyle}
            onClick={onClickWrapper(rest)}
            data-test={`dimension-item-${rest.id}`}
        >
            <ItemIcon
                backgroundColor={
                    highlighted ? colors.white : theme.secondary600
                }
            />
            <span
                style={itemLabelStyle}
            >
                {name}
            </span>
            <DeselectIconButton
                fill={highlighted ? colors.white : theme.secondary600}
                onClick={() => onRemoveItem(rest.id)}
            />
        </div>
    )
}

Item.defaultProps = {
    active: true,
    onRemoveItem: () => null,
    onClick: () => null,
}

Item.propTypes = {
    highlighted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    ghost: PropTypes.bool,
    onClick: PropTypes.func,
    onRemoveItem: PropTypes.func,
}

export default Item
