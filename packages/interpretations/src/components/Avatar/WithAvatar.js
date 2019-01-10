import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

export const WithAvatar = ({ className, classes, onClick, user, children }) => (
    <div className={className} onClick={onClick}>
        <div className={classes.avatarBox}>
            <UserAvatar user={user} />
        </div>
        <div className={classes.avatarBoxContent}>
            {children}
        </div>
    </div>
);

WithAvatar.defaultProps = {
    onClick: () => null,
};

WithAvatar.propTypes = {
    style: PropTypes.object,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.oneOfType(
        [PropTypes.array, PropTypes.object]
    ).isRequired,
};

export default withStyles(styles)(WithAvatar);