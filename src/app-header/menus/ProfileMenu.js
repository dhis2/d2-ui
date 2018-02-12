import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import styles from '../header-bar-styles';
import addD2Context from '../../component-helpers/addD2Context';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';

const getBaseUrl = getBaseUrlFromD2ApiUrl;

const ProfileMenu = addD2Context((props, { d2 }) => {
    const { currentUser, items } = props;
    const menuItems = items.map((item, index) => (<HeaderMenuItem key={index} {...item} />));

    if (!currentUser.firstName) {
        return (<div />);
    }

    const rightSideStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        justifyContent: 'space-between',
        borderLeft: '1px solid #CCC',
        backgroundColor: '#F5F5F5',
    };

    // TODO: Pull out these styles
    const rightSide = (
        <div style={rightSideStyle}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar size={60} style={styles.avatarBig}>{`${currentUser.firstName.charAt(0)} ${currentUser.surname.charAt(0)}`}</Avatar>
                <div>
                    <div style={{ width: '100%', marginTop: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }}>{currentUser.displayName}</div>
                    <div style={{ width: '100%', lineHeight: '1.5rem' }}>{currentUser.email}</div>
                </div>
            </div>
            <FlatButton style={{ width: '100%', textAlign: 'center' }} href={`${getBaseUrl(d2)}/dhis-web-commons-security/logout.action`}>
                {d2.i18n.getTranslation('log_out')}
            </FlatButton>
        </div>
    );

    return (
        <HeaderMenu
            name={<Avatar size={32} style={styles.avatar}>{`${currentUser.firstName.charAt(0)} ${currentUser.surname.charAt(0)}`}</Avatar>}
            rowItemCount={props.rowItemCount}
            columnItemCount={props.columnItemCount}
            rightSide={rightSide}
            width={700}
            menuStyle={{
                flexDirection: 'row',
                width: 600,
                padding: '0',
            }}
            padding="1rem"
        >
            {menuItems}
        </HeaderMenu>
    );
});

export default ProfileMenu;
