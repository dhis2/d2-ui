import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/TextSeparator.style';

export const TextSeparator = ({ classes, labelText = "·" }) => (
    <label className={classes.linkArea}>{labelText}</label>
);

TextSeparator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextSeparator);
