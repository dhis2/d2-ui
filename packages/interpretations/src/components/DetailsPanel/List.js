import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Details.style';

export const List = ({ classes, children }) => (
    <div className={classes.detailsCardList}>
        {children}
    </div>
);

List.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(List);
