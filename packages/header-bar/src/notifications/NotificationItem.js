import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import { SvgIcon } from '@dhis2/d2-ui-core';
import styles from '../header-bar-styles';

import { withStyles } from 'material-ui/styles';

const badgeStyles = theme => ({
	root: styles.notificationBadge,
	badge: styles.notificationBadgeIcon
})
const StyledBadge = withStyles(badgeStyles)(Badge);

const iconStyles = ({
	root: styles.notificationButton,
});
const StyledIconButton = withStyles(iconStyles)(IconButton);

const NotificationItem = (props) => {
    const { count } = props;

    if (count && count > 0) {
        return (
            <StyledBadge
                color="secondary"
                badgeContent={count > 99 ? '99+' : count}
            >
                <NotificationIcon { ...props } />
            </StyledBadge>
        );
    }

    return (
        <NotificationIcon { ...props } />
    );
}

const NotificationIcon = ({ icon, href, tooltip, style = {} }) => (
    <StyledIconButton
        href={href}
        tooltip={tooltip}
		style={style}
    >
        <SvgIcon icon={icon} style={styles.notificationIcon}/>
    </StyledIconButton>
);

export default NotificationItem;
