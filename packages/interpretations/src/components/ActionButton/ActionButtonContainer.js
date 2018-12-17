import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import styles from './styles/ActionButtonContainer.style';

const UNLIKE_INDEX = 0;
const LIKE_INDEX = 1;
const REPLY_INDEX = 2;
const EXIT_VIEW_INDEX = 3;
const SHARE_INDEX = 4;
const EDIT_INDEX = 5;
const DELETE_INDEX = 6;
const VIEW_INDEX = 7;

export const ActionButtonContainer = ({ 
    classes, 
    currentUserLikesInterpretation,
    showActions,
    userCanManage,
    onClickHandlers,
}) => {
    const renderLikeButton = currentUserLikesInterpretation ? (
        <ActionButton 
            iconType={'unlike'} 
            onClick={onClickHandlers[UNLIKE_INDEX]}
        />
    ) : (
        <ActionButton 
            iconType={'like'} 
            onClick={onClickHandlers[LIKE_INDEX]}
        />
    );

    const renderOwnerActions = userCanManage && (
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
    );

    return (
        <div className={classes.actions}>
            {showActions ? (
                <Fragment>
                    {renderLikeButton}
                    <ActionButton 
                        iconType={'reply'} 
                        onClick={onClickHandlers[REPLY_INDEX]}
                    />
                    <ActionButton 
                        iconType={'visibilityOff'} 
                        onClick={onClickHandlers[EXIT_VIEW_INDEX]}
                    />
                    {renderOwnerActions}
                </Fragment>
            ) : (
                <ActionButton 
                    iconType={'visibility'} 
                    onClick={onClickHandlers[VIEW_INDEX]}
                />
            )}
        </div>
    );
};

ActionButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUserLikesInterpretation: PropTypes.bool.isRequired,
    showActions: PropTypes.bool.isRequired,
    userCanManage: PropTypes.bool.isRequired,
    onClickHandlers: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionButtonContainer);
