import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Likes from '../Interpretation/Likes';
import Replies from '../Interpretation/Replies';
import styles from './styles/CardInfo.style';

export const CardInfo = ({ classes, likedBy, repliedBy, createdDate }) => (
    <div className={classes.cardInfo}>
        <span> {createdDate} </span>
        <Likes likedBy={likedBy} />
        <Replies repliedBy={repliedBy} />
    </div>
);

CardInfo.defaultProps = {
    likedBy: [],
    repliedBy: [],
};

CardInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    likedBy: PropTypes.array.isRequired,
    repliedBy: PropTypes.array.isRequired,
    createdDate: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardInfo);