import React, { PropTypes } from 'react';
import styles from '../header-bar-styles';

export default function HeaderMenuItem(props) {
    return (
        <a href={props.action} style={styles.menuItemLink}>
            <div><img style={styles.menuItemIcon} src={props.icon} /></div>
            <div style={{textAlign: 'center'}}>{props.label}</div>
        </a>
    );
}
HeaderMenuItem.propTypes = {
    action: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
};
