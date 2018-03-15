import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import addD2Context from 'd2-ui/lib/component-helpers/addD2Context';
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
    const rightSide = (
        <div style={styles.profileRightSide}>
            <div style={styles.profileFlexWrap}>
                <Avatar size={60} style={styles.avatarBig}>{initials}</Avatar>
                <div>
                    <div key={name} style={styles.profileName}>{currentUser.displayName}</div>
                    <div style={styles.profileMail}>{currentUser.email}</div>
                </div>
            </div>
            <FlatButton style={styles.logoutButton} href={`${getBaseUrl(d2)}/dhis-web-commons-security/logout.action`}>
                {d2.i18n.getTranslation('log_out')}
            </FlatButton>
        </div>
    );

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
