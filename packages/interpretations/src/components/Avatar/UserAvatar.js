import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

const UserAvatar = ({ classes, firstName, surname }) => {
    const initials = firstName.charAt(0).concat(surname.charAt(0))
    
    return <Avatar color="black" className={classes.avatar}>{initials}</Avatar>;
};

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    firstName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserAvatar);