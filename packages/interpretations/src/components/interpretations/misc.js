import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from './InterpretationsStyles.js';

export const getUserLink = (d2, user) => {
    // Currently there is no public page for users (DHIS2-691), just use a <span> for now
    return (
        <span style={styles.userLink} className="author">
            {user.displayName}
        </span>
    );
};

export const Link = (props) => {
    const { label, value, onClick, ...otherProps } = props;
    return (
        <a
            style={styles.interpretationLink}
            onClick={ev => onClick(value)}
            {...otherProps}
        >
            {label}
        </a>
    );
};

export const ActionSeparator = ({labelText = "·"}) => (
    <label style={styles.linkArea}>{labelText}</label>
);

const UserAvatar = ({user}) => {
    const initials = user.displayName.split(" ").map(part => part[0]).slice(0, 2).join("");
    return <Avatar color="black" style={styles.avatar}>{initials}</Avatar>;
};

export const WithAvatar = ({ user, children }) => (
    <div style={styles.avatarWrapper}>
        <div style={styles.avatarBox}>
            <UserAvatar user={user} />
        </div>

        <div style={styles.avatarBoxContent}>
            {children}
        </div>
    </div>
);
