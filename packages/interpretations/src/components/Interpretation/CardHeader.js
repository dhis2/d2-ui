import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { formatRelative } from '../../dateformats/dateformatter';
import styles from './styles/CardHeader.style';

const getUserLink = (d2, user) => (
    // Currently there is no public page for users (DHIS2-691), just use a <span> for now
    <span style={styles.userLink} className="author">
        {user.displayName}
    </span>
);

export const CardHeader = ({ classes, d2, locale, cardInfo }) => (
    <div className={classes.interpretationName}>
        {getUserLink(d2, cardInfo.user)}

        <span className={classes.date}>
            {formatRelative(cardInfo.created, locale)}
        </span>
    </div>
);

CardHeader.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};

CardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardHeader);
