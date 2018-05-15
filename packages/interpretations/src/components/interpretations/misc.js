import React from 'react';
import { Avatar } from 'material-ui';
import styles from './InterpretationsStyles.js';

export const EditButton = props => {
    const { model, tooltip, icon, onClick } = props;
    const iconStyle = {width: 14, height: 14, padding: 0, marginLeft: 2};

    if (model && model.access && model.access.update) {
        return (
            <IconButton tooltip={tooltip} onClick={onClick} style={iconStyle} iconStyle={iconStyle}>
                <SvgIcon icon={icon} color={grey600} />
            </IconButton>
        );
    } else {
        return null;
    }
};

export const getUserLink = (d2, user) => {
    const baseurl = d2.system.systemInfo.contextPath;
    const userUrl =`${baseurl}/dhis-web-messaging/profile.action?id=${user.id}`;
    return (<a href={userUrl} style={styles.userLink} className="author" target="_blank">{user.displayName}</a>);
};

export const Link = (props) => {
    const { label, ...otherProps } = props;
    return <a style={styles.interpretationLink} {...otherProps}>{label}</a>;
};

export const ActionSeparator = ({labelText = "·"}) => (
    <label style={styles.linkArea}>{labelText}</label>
);

const UserAvatar = ({user}) => {
    const initials = user.displayName.split(" ").map(part => part[0]).slice(0, 2).join("");
    const style = {fontSize: 15, fontWeight: 'bold'};
    return <Avatar color="black" size={32} style={style}>{initials}</Avatar>;
};

export const WithAvatar = ({ user, children }) => (
    <div style={{display: "flex", marginTop: 10, marginBottom: 10, ...styles.greyBackground}}>
        <div style={{width: 40, marginLeft: 5}}>
            <UserAvatar user={user} />
        </div>

        <div style={{width: '90%'}}>
            {children}
        </div>
    </div>
);
