import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ActionSeparator.style';

export const ActionSeparator = ({ classes, labelText = "·" }) => (
    <label className={classes.linkArea}>{labelText}</label>
);

ActionSeparator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionSeparator);