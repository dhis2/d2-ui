import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import SvgIcon from 'd2-ui/lib/svg-icon/SvgIcon';
import styles from '../header-bar-styles';

const NotificationItem = (props) => {
    const { count } = props;

    if (count && count > 0) {
        return (
            <Badge
                color="secondary"
                badgeContent={count > 99 ? '99+' : count}
                style={styles.notificationBadge}
                badgeStyle={styles.notificationBadgeIcon}
            >
                <NotificationIcon { ...props } />
            </Badge>
        );
    }

    return (
        <NotificationIcon { ...props } />
    );
}

const NotificationIcon = ({ icon, href, tooltip, style = {} }) => (
    <IconButton
        href={href}
        style={{ ...styles.notificationButton, ...style}}
        iconStyle={styles.notificationIcon}
        tooltip={tooltip}
    >
        <SvgIcon icon={icon} />
    </IconButton>
);

export default NotificationItem;
