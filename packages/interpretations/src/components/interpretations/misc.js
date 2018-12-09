import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Reply from '@material-ui/icons/Reply';
import Create from '@material-ui/icons/Create';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import styles from './styles/misc.style';

export const getUserLink = (d2, user) => (
    // Currently there is no public page for users (DHIS2-691), just use a <span> for now
    <span style={styles.userLink} className="author">
        {user.displayName}
    </span>
);

export const Link = ({ label, value, onClick, ...otherProps }) => (
    <a
        style={styles.interpretationLink}
        onClick={() => onClick(value)}
        {...otherProps}
    >
        {label}
    </a>
);

export const ActionSeparator = ({labelText = "·"}) => (
    <label style={styles.linkArea}>{labelText}</label>
);

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


export const Icons = {
	visibility: <Visibility style={styles.interpretationCommentIcon}/>,
	visibilityOff: <VisibilityOff style={styles.interpretationCommentIcon} />,
    like: <ThumbUpIcon style={{...styles.interpretationCommentIcon, ...styles.likedInterpretationIcon}} />,
    unlike: <ThumbUpIcon style={styles.interpretationCommentIcon} />,
	reply: <Reply style={styles.interpretationCommentIcon} />,
	edit: <Create  style={styles.interpretationCommentIcon} />,
	share: <Share style={styles.interpretationCommentIcon} />,
	delete: <Delete style={styles.interpretationCommentIcon} />,
}

