import React from 'react'
import PropTypes from 'prop-types'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'

import styles from './styles/ArrowButton.style'

export const ArrowButton = ({ onClick, iconType }) => (
    <button className="item-selector-arrow-button" style={styles.arrowButton} onClick={onClick}>
        <span style={styles.arrowIcon}>
            {iconType === 'arrowForward' ? <ArrowForward /> : <ArrowBack />}
        </span>
    </button>
)

ArrowButton.propTypes = {
    iconType: PropTypes.string,
    onClick: PropTypes.func,
}

export default ArrowButton
