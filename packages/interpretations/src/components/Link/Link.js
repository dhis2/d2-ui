import React from 'react';

const styles = {
    interpretationLink: {
        color: '#3162C5',
        cursor: 'pointer',
        fontSize: '13px',
    },
}

export const Link = ({ label, value, onClick, ...otherProps }) => (
    <a
        style={styles.interpretationLink}
        onClick={() => onClick(value)}
        {...otherProps}
    >
        {label}
    </a>
);

export default Link;