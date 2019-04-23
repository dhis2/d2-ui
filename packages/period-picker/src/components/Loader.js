import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => {
    return {
        loader: {
            padding: 16,
            textAlign: 'center',
        },
    };
};

const Loader = ({ classes }) => {
    return (
        <div className={classes.loader}>
            <CircularProgress size={29.5} thickness={2.5} />
        </div>
    );
};

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
