import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { formatRelative } from '../../dateformats/dateformatter';
import styles from './styles/CardHeader.style';


export const CardHeader = ({ classes, locale, userName, createdDate }) => (
    <div className={classes.interpretationName}>
        <span style={styles.userLink}>
            {userName}
        </span>
        <span className={classes.date}>
            {formatRelative(createdDate, locale)}
        </span>
    </div>
);

CardHeader.contextTypes = {
    locale: PropTypes.string.isRequired,
};

CardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardHeader);
