import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import ItemIcon from './ItemIcon'
import styles from './styles/UnselectedItem.style'

const onClickWrapper = ({ id, index, onClick }) => event =>
    onClick({
        isCtrlPressed: event.metaKey || event.ctrlKey,
        isShiftPressed: event.shiftKey,
        index,
        id,
    })

export const Item = ({ name, highlighted, ...rest }) => {
    const itemStyle= Object.assign({}, styles.item, highlighted && styles.highlightedItem)
    const itemLabelStyle = Object.assign({}, styles.itemLabel, highlighted && styles.highlightedText)
    return (
        <div
            className={cx("unselected-period-item", highlighted && 'highlighted')}
            style={itemStyle}
            onClick={onClickWrapper(rest)}
            data-test={`dimension-item-${rest.id}`}
        >
            <ItemIcon backgroundColor="#a0adba" />
            <span
                style={itemLabelStyle}
            >
                {name}
            </span>
        </div>
    )
}

Item.defualtProps = {
    onClick: () => null,
}

Item.propTypes = {
    highlighted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default Item
