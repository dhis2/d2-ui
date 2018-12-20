import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Details.style';

export const ListItem = ({ classes, label, text }) => (
    <div className={classes.detailsCardItem}>
        {label && <label style={styles.listItemLabel}>{label}:</label>}
        {text}
    </div>
);

ListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
};

export default withStyles(styles)(ListItem);
