import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import { addD2Context } from '@dhis2/d2-ui-core';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';
import styles from '../header-bar-styles';

const getBaseUrl = getBaseUrlFromD2ApiUrl;

const ProfileMenu = addD2Context((props, { d2 }) => {
    const { currentUser, items } = props;
    const menuItems = items.map((item, index) => (<HeaderMenuItem key={index} {...item} />));

    if (!currentUser.firstName) {
        return (<div />);
    }

    const initials = `${currentUser.firstName.charAt(0)}${currentUser.surname.charAt(0)}`;
    /* eslint-disable */
    const rightSide = (
        <div style={styles.profileRightSide}>
            <div style={styles.profileFlexWrap}>
                <Avatar style={styles.avatarBig}>{initials}</Avatar>
                <div>
                    <div key={name} style={styles.profileName}>{currentUser.displayName}</div>
                    <div style={styles.profileMail}>{currentUser.email}</div>
                </div>
            </div>
            <Button style={styles.logoutButton} href={`${getBaseUrl(d2)}/dhis-web-commons-security/logout.action`}>
                {d2.i18n.getTranslation('log_out')}
            </Button>
        </div>
    );
    /* eslint-enable */

    return (
        <HeaderMenu
            name={<Avatar size={32} style={styles.avatar}>{initials}</Avatar>}
            rowItemCount={props.rowItemCount}
            columnItemCount={props.columnItemCount}
            rightSide={rightSide}
            width={700}
            menuStyle={styles.profileMenu}
            padding="1rem"
        >
            {menuItems}
        </HeaderMenu>
    );
});

export default ProfileMenu;
