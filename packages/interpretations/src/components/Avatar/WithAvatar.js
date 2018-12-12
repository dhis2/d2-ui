import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles/WithAvatar.style';

const UserAvatar = ({user}) => {
    const initials = user.displayName.split(" ").map(part => part[0]).slice(0, 2).join("");
    return <Avatar color="black" style={styles.avatar}>{initials}</Avatar>;
};

export const WithAvatar = ({ style, user, children }) => (
    <div style={style || styles.avatarWrapper}>
        <div style={styles.avatarBox}>
            <UserAvatar user={user} />
        </div>

        <div style={styles.avatarBoxContent}>
            {children}
        </div>
    </div>
);

export default WithAvatar;