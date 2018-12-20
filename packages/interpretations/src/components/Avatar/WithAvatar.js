import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

export const WithAvatar = ({ style, classes, user, children }) => (
    <div style={style || styles.avatarWrapper}>
        <div className={classes.avatarBox}>
            <UserAvatar user={user} />
        </div>
        <div className={classes.avatarBoxContent}>
            {children}
        </div>
    </div>
);

WithAvatar.propTypes = {
    style: PropTypes.object,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default withStyles(styles)(WithAvatar);