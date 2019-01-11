import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Link.style'

export const Link = ({ label, value, onClick, ...otherProps }) => (
    <a
        style={styles.interpretationLink}
        onClick={() => onClick(value)}
        {...otherProps}
    >
        {label}
    </a>
);

Link.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    otherProps: PropTypes.object,
};

export default Link;
