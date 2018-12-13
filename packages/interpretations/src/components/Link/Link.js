import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Link.style'

export const Link = ({ classes, label, value, onClick, ...otherProps }) => (
    <a
        className={classes.interpretationLink}
        onClick={() => onClick(value)}
        {...otherProps}
    >
        {label}
    </a>
);

Link.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    otherProps: PropTypes.object,
};

export default withStyles(styles)(Link);

