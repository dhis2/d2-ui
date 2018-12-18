import React from 'react';
import styles from './styles/Details.style';

export const ListItem = ({ label, text, button }) => (
    <div style={styles.detailsCardItem}>
        {label && <label style={styles.listItemLabel}>{label}:</label>}
        {text}
        {button}
    </div>
);

export default ListItem;
