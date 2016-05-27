import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import styles from '../header-bar-styles';

function ProfileMenu(props) {
    const { currentUser, items } = props;
    const menuItems = props.items.map((item, index) => (<HeaderMenuItem key={index} {...item} />));

    return (
        <HeaderMenu
            name={<Avatar style={styles.avatar}>{`${currentUser.firstName.charAt(0)} ${currentUser.surname.charAt(0)}`}</Avatar>}
            rowItemCount={props.rowItemCount}
            columnItemCount={props.columnItemCount}
        >
            {menuItems}
        </HeaderMenu>
    );
}

export default ProfileMenu;
