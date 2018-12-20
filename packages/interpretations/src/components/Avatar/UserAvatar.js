import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

const UserAvatar = ({ classes, user }) => {
    const initials = user.displayName
        .split(" ")
        .map(part => part[0]).slice(0, 2).join("");
    
    return <Avatar color="black" className={classes.avatar}>{initials}</Avatar>;
};

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAvatar);