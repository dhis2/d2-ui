import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import orderBy from 'lodash/fp/orderBy';
import NewCommentField from '../Comment/NewCommentField';
import Comment from '../Comment/Comment';
import Link from '../Link/Link';
import CommentModel from '../../models/comment';
import { userCanManage } from '../../authorization/auth';
import styles from './styles/CommentsList.style';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

const commentsToShowOnInit = 5;

export class CommentsList extends React.Component {
    static contextTypes = {
        locale: PropTypes.string,
        d2: PropTypes.object.isRequired,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        interpretation: PropTypes.object.isRequired,
        newComment: PropTypes.object,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onReply = this.onReply.bind(this);

        this.state = {
            listIsExpanded: !(this.props.interpretation.comments.length > commentsToShowOnInit),
            commentToEdit: null,
            newComment: props.newComment,
            deleteDialogIsOpen: false,
            commentToDelete: null,
        };
    };

   componentDidMount() {
       const newComment = CommentModel.getReplyForInterpretation(
           this.context.d2,
           this.props.interpretation
       );
       this.setState({ newComment, showToolbar: true });
   };

    componentDidUpdate(prevProps) {
        if (this.props.newComment !== prevProps.newComment) {
            this.setState({ newComment: this.props.newComment});
        }
    };

    onSave(comment) {
        comment.save(this.context.d2).then(() => this.props.onChange(this.props.interpretation));
    };

    onDeleteComment() {
        this.state.commentToDelete.delete(this.context.d2).then(() => this.props.onChange(this.props.interpretation));
        this.onCloseDeleteDialog();
    };

    onShowMoreComments = () =>
        this.setState({ listIsExpanded: true });

    onHideOldComments = () =>
        this.setState({ listIsExpanded: false });

    onEdit = comment =>
        this.setState({ commentToEdit: comment });

    onCancelEdit = () =>
        this.setState({ commentToEdit: null });

    onCancelNewComment = () => {
        this.setState({ newComment: null });
        this.props.onCancel();
    };

    onOpenDeleteDialog = comment =>
        this.setState({ deleteDialogIsOpen: true, commentToDelete: comment });

    onCloseDeleteDialog = () =>
        this.setState({ deleteDialogIsOpen: false, commentToDelete: null });

    onUpdate(comment) {
        this.onSave(comment);
        this.setState({ commentToEdit: null });
    };

    onReply(comment) {
        const newComment = comment.getReply(this.context.d2);
        this.setState({ commentToEdit: null, newComment });
    };

    getComments = () => {
        const sortedComments = orderBy(["created"], ["asc"], this.props.interpretation.comments);

        return !this.state.listIsExpanded 
            ? sortedComments.slice(-commentsToShowOnInit)
            : sortedComments;
    };

    renderViewMoreLink = () =>
        this.props.interpretation.comments.length > commentsToShowOnInit && (
            <Link
                label={this.state.listIsExpanded ? i18n.t('Hide old replies') : i18n.t('View more replies')} 
                onClick={this.state.listIsExpanded ? this.onHideOldComments : this.onShowMoreComments}
            />
        );

    renderComments = () =>  
        this.getComments().map(comment =>
            this.state.commentToEdit && this.state.commentToEdit.id === comment.id ? (
                <NewCommentField
                    key={comment.id}
                    comment={comment}
                    onPost={this.onUpdate}
                    onCancel={this.onCancelEdit}
                />
            ) : (
                <Comment
                    key={comment.id}
                    comment={comment}
                    canReply={this.props.canReply}
                    isOwner={userCanManage(this.context.d2, comment)}
                    locale={this.context.locale}
                    onEdit={this.onEdit}
                    onReply={this.onReply}
                    onDelete={this.onOpenDeleteDialog}
                />
            )
        );

    renderInputField = () => 
        this.props.canReply && (
            <NewCommentField
                comment={this.state.newComment}
                onPost={this.onSave}
            />
        );


    render() {
        const ViewMoreReplies = this.renderViewMoreLink();
        const Comments = this.renderComments();
        const InputField = this.renderInputField();

        return (
            <div className={this.props.classes.commentSection}>
            {ViewMoreReplies}
            {Comments}
            {InputField}
            {this.state.deleteDialogIsOpen && (
                <DeleteDialog
                    title={i18n.t('Delete comment')}
                    text={i18n.t('Are you sure you want to delete this comment?')}
                    onDelete={this.onDeleteComment}
                    onCancel={this.onCloseDeleteDialog}
                />
            )}
            </div>
        );
    }
};

export default withStyles(styles)(CommentsList);
