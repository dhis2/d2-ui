import React from 'react';
import styles from './styles/Details.style';

export const List = ({ children }) => (
    <div style={styles.detailsCardList}>
        {children}
    </div>
);

export default List;
