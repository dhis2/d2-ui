import React from 'react'
import PropTypes from 'prop-types'

const ItemIcon = ({ backgroundColor }) => {
    const style = {
        backgroundColor,
        minHeight: '6px',
        minWidth: '6px',
        margin: '0 5px',
    }
    return (
        <div style={style} />
    )
}

ItemIcon.propTypes = {
    backgroundColor: PropTypes.string,
}

export default ItemIcon
