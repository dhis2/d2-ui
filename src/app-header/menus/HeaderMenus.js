import React from 'react';
import styles from '../header-bar-styles';

export default function HeaderMenus(props) {
    return (
        <div style={styles.menusWrap}>{props.children}</div>
    );
}
