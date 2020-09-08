import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

export const UserAvatar = ({ classes, displayName }) => {
    const nameParts = displayName ? displayName.split(' ') : ['USER']

    let initials = nameParts.shift().charAt(0)

    if (nameParts.length) {
        initials += nameParts.pop().charAt(0)
    }
    
    return <Avatar color="black" className={classes.avatar}>{initials}</Avatar>;
};

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    displayName: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserAvatar);
