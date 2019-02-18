import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import ActionButton from '../Buttons/ActionButton';
import WithAvatar from '../Avatar/WithAvatar';
import CardHeader from '../Cards/CardHeader';
import CardText from '../Cards/CardText';
import CardInfo from '../Cards/CardInfo';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
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
    dialogIsOpen,
    onDeleteConfirm,
    onDeleteCancel, 
}) => (
    <Fragment>
        <WithAvatar className={classes.comment} key={comment.id} firstName={comment.user.firstName} surname={comment.user.surname}>
            <CardHeader userName={comment.user.displayName} />
            <CardText text={comment.text}/>
            <CardInfo createdDate={formatDate(comment.created, locale)} />
            {isOwner ? (
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
                        onClick={onDelete} 
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
        {dialogIsOpen && (
            <DeleteDialog
                title={i18n.t('Delete comment')}
                text={i18n.t('Are you sure you want to delete this comment?')}
                onDelete={() => onDeleteConfirm(comment)}
                onCancel={onDeleteCancel}
            />
        )}
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
    dialogIsOpen: PropTypes.bool.isRequired,
    onDeleteConfirm: PropTypes.func.isRequired,
    onDeleteCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comment);
