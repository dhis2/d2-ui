import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Details.style';

export const Item = ({ classes, label, text }) => (
    <div className={classes.detailsCardItem}>
        {label && <label className={classes.item}>{label}:</label>}
        {text}
    </div>
);

Item.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default withStyles(styles)(Item);
