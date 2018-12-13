import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import ActionButton from './ActionButton';
import styles from './styles/ActionButtonContainer.style';

export const ActionButtonContainer = ({ 
    classes, 
    currentUserLikesInterpretation,
    showActions,
    userCanManage,
    onClickHandlers,
}) => (
    <div className={classes.actions}>
        {showActions ? (
            currentUserLikesInterpretation ? (
                <ActionButton 
                    iconType={'unlike'} 
                    tooltip={i18n.t('Unlike')} 
                    onClick={onClickHandlers[0]}
                />
            ) : (
                <ActionButton 
                    iconType={'like'} 
                    tooltip={i18n.t('Like')} 
                    onClick={onClickHandlers[1]}
                />
            ),
            <Fragment>
                <ActionButton 
                    iconType={'reply'} 
                    tooltip={i18n.t('Reply')} 
                    onClick={onClickHandlers[2]}
                />
                <ActionButton 
                    iconType={'visibilityOff'} 
                    tooltip={i18n.t('Exit View')} 
                    onClick={onClickHandlers[3]}
                />
                {userCanManage && (
                    <Fragment>
                        <ActionButton 
                            iconType={'share'} 
                            tooltip={i18n.t('Share')} 
                            onClick={onClickHandlers[4]}
                        />
                        <ActionButton 
                            iconType={'edit'} 
                            tooltip={i18n.t('Edit')} 
                            onClick={onClickHandlers[5]}
                        />      
                        <ActionButton 
                            iconType={'delete'} 
                            tooltip={i18n.t('Delete')} 
                            onClick={onClickHandlers[6]}
                        />
                    </Fragment>
                )}
            </Fragment>
        ) : (
            <ActionButton 
                iconType={'visibility'} 
                tooltip={i18n.t('View')}  
                onClick={onClickHandlers[7]}
            />
        )}
    </div>
);

ActionButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUserLikesInterpretation: PropTypes.bool.isRequired,
    showActions: PropTypes.bool.isRequired,
    userCanManage: PropTypes.bool.isRequired,
    onClickHandlers: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionButtonContainer);
