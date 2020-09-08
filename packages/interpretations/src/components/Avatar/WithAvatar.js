import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

export const WithAvatar = ({ classes, className, onClick, displayName, children }) => (
    <div className={className} onClick={onClick}>
        <div className={classes.avatarBox}>
            <UserAvatar displayName={displayName} />
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
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    children: PropTypes.oneOfType(
        [PropTypes.array, PropTypes.object]
    ).isRequired,
};

export default withStyles(styles)(WithAvatar);
