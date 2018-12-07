import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Reply from '@material-ui/icons/Reply';
import Create from '@material-ui/icons/Create';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
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

export const Icons = {
	visibility: <Visibility style={styles.viewIcon}/>,
	visibilityOff: <VisibilityOff style={styles.viewIcon} />,
    like: <ThumbUpIcon style={{...styles.likedThumbUp, ...styles.interpretationCommentIcon}}/>,
    unlike: <ThumbUpIcon style={{...styles.defaulThumbUp, ...styles.interpretationCommentIcon}} />,
	reply: <Reply style={styles.interpretationCommentIcon}/>,
	edit: <Create style={styles.interpretationCommentIcon} />,
	share: <Share style={styles.interpretationCommentIcon}/>,
	delete: <Delete style={styles.interpretationCommentIcon} />,
}