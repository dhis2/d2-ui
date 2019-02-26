import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import RedirectButton from './RedirectButton';
import styles from './styles/ActionButtonContainer.style';

const UNLIKE_INDEX = 0;
const LIKE_INDEX = 1;
const VIEW_INDEX = 2;
const EXIT_VIEW_INDEX = 3;
const SHARE_INDEX = 4;
const EDIT_INDEX = 5;
const DELETE_INDEX = 6;
const REPLY_INDEX = 7;

export const ActionButtonContainer = ({ 
    classes, 
    isFocused,
    currentUserLikesInterpretation,
    canReply,
    canManage,
    onClickHandlers,
}) => (
    <div className={classes.actions}>
        <ActionButton
            iconType={currentUserLikesInterpretation ? 'unlike' : 'like'} 
            onClick={onClickHandlers[currentUserLikesInterpretation ? UNLIKE_INDEX : LIKE_INDEX]}
        />
        {canReply && (
            <ActionButton 
                iconType={'reply'} 
                onClick={onClickHandlers[REPLY_INDEX]}
            />
        )}
        <ActionButton 
            iconType={isFocused ? 'visibilityOff' : 'visibility'} 
            onClick={onClickHandlers[isFocused ? EXIT_VIEW_INDEX : VIEW_INDEX]}
        />
        <RedirectButton />
        {canManage && (
            <Fragment>
                <ActionButton 
                    iconType={'share'} 
                    onClick={onClickHandlers[SHARE_INDEX]}
                />
                <ActionButton 
                    iconType={'edit'} 
                    onClick={onClickHandlers[EDIT_INDEX]}
                />      
                <ActionButton 
                    iconType={'delete'} 
                    onClick={onClickHandlers[DELETE_INDEX]}
                />
            </Fragment>
        )}
    </div>
);

ActionButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
    currentUserLikesInterpretation: PropTypes.bool.isRequired,
    canReply: PropTypes.bool.isRequired,
    canManage: PropTypes.bool.isRequired,
    onClickHandlers: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionButtonContainer);
