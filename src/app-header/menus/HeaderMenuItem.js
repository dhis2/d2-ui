import React, { PropTypes } from 'react';
import styles from '../header-bar-styles';

function goTo(url) {
    window.location = url;
}

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

HeaderMenuItem.defaultProps = {
    icon: DHIS_CONFIG.baseUrl + '/icons/program.png',
};
