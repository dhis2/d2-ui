import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from '../ActionButton/ActionButton';
import CardText from '../Cards/CardText';
import styles from './styles/InterpretationComment.style';

export const OldComment = ({ 
    classes, 
    comment, 
    showManageActions, 
    onEdit, 
    onDelete, 
    onReply 
}) => (
    <Fragment>
        <CardText 
            extended={true}
            text={comment.text}
        />
        {showManageActions ? 
            <div className={classes.commentActions}>
                <ActionButton
                    iconType={'edit'} 
                    onClick={() => onEdit(comment)} 
                />
                <ActionButton
                    iconType={'reply'} 
                    onClick={() => onReply(comment)} 
                />
                <ActionButton
                    iconType={'delete'} 
                    onClick={() => onDelete(comment)} 
                />
            </div>
            :
            <ActionButton
                iconType={'reply'}  
                onClick={() => onReply(comment)} 
            />
        }
    </Fragment>
);

OldComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    showManageActions: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
};

export default withStyles(styles)(OldComment);
