import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import InterpretationIcon from './InterpretationActionButton';
import styles from './styles/Comment.style';

export const InterpretationComment = ({ 
    classes, 
    comment, 
    showManageActions, 
    onEdit, 
    onDelete, 
    onReply 
}) => (
    <Fragment>
        <div className={classes.commentText}>
            {comment.text}
        </div>
        {showManageActions ?
            <div className={classes.commentActions}>
                <InterpretationIcon 
                    iconType={'edit'} 
                    tooltip={i18n.t('Edit')} 
                    onClick={() => onEdit(comment)} 
                />
                <InterpretationIcon 
                    iconType={'reply'} 
                    tooltip={i18n.t('Reply')} 
                    onClick={() => onReply(comment)} 
                />
                <InterpretationIcon 
                    iconType={'delete'} 
                    tooltip={i18n.t('Delete')} 
                    onClick={() => onDelete(comment)} 
                />
            </div>
            :
            <InterpretationIcon 
                iconType={'reply'} 
                tooltip={i18n.t('Reply')} 
                onClick={() => onReply(comment)} 
            />
        }
    </Fragment>
);

InterpretationComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    showManageActions: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
};

export default withStyles(styles)(InterpretationComment);
