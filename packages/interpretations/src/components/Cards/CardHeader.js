import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/CardHeader.style';


export const CardHeader = ({ classes, userName }) => (
    <div className={classes.interpretationName}>
        <span style={styles.userLink}>
            {userName}
        </span>
    </div>
);

CardHeader.contextTypes = {
    locale: PropTypes.string.isRequired,
};

CardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardHeader);
