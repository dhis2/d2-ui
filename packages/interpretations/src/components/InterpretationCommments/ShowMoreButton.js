import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import styles from './styles/ShowMoreButton.style';

export const ShowMoreButton = ({ classes, showButton, hiddenCommentsCount, onClick }) => (
    showButton && (
        <div className={classes.showMoreCommentSection}>
            <Button onClick={onClick} className={classes.showMoreCommentButton}>
                <span className={classes.showMoreComments}>
                    {hiddenCommentsCount} {i18n.t("more comments")}
                </span>
            </Button>
        </div>  
    )
);

ShowMoreButton.propTypes = {
    classes: PropTypes.object.isRequired,
    hiddenCommentsCount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ShowMoreButton);