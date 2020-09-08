import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from '../Buttons/ActionButton';
import WithAvatar from '../Avatar/WithAvatar';
import CardHeader from '../Cards/CardHeader';
import CardText from '../Cards/CardText';
import CardInfo from '../Cards/CardInfo';
import { formatDate } from '../../dateformats/dateformatter';
import styles from './styles/Comment.style';

export const Comment = ({ 
    classes,
    comment, 
    isOwner,
    canReply,
    locale, 
    onEdit, 
    onReply,
    onDelete,
}) => (
    <Fragment>
        <WithAvatar className={classes.comment} key={comment.id} displayName={comment.user.displayName}>
            <CardHeader userName={comment.user.displayName} />
            <CardText text={comment.text}/>
            <CardInfo createdDate={formatDate(comment.created, locale)} />
            {isOwner && canReply ? (
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
             ) : (
                canReply && (                        
                    <ActionButton
                        iconType={'reply'}  
                        onClick={() => onReply(comment)} 
                    />
                )
             )}
        </WithAvatar>
    </Fragment>
);

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    isOwner: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comment);
