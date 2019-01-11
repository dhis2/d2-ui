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

const commentsToShowOnInit = 5;

export class CommentsList extends React.Component {
    static contextTypes = {
        locale: PropTypes.string,
        d2: PropTypes.object.isRequired,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        interpretation: PropTypes.object.isRequired,
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
            newComment: null,
            deleteDialogIsOpen: false,
        };
    };

    componentWillReceiveProps() {
        this.getNewComment();
    };

    componentDidMount() {
        this.getNewComment();
    };

    onSave(comment) {
        comment.save(this.context.d2).then(() => this.props.onChange(this.props.interpretation));
        this.getNewComment();
    };

    onDeleteComment(comment) {
        comment.delete(this.context.d2).then(() => this.props.onChange(this.props.interpretation));
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

    onOpenDeleteDialog = () =>
        this.setState({ deleteDialogIsOpen: true });

    onCloseDeleteDialog = () =>
        this.setState({ deleteDialogIsOpen: false });

    onUpdate(comment) {
        this.onSave(comment);
        this.setState({ commentToEdit: null });
    };

    onReply(comment) {
        const newComment = comment.getReply(this.context.d2);
        this.setState({ commentToEdit: null, newComment });
    };

    getNewComment() {
        const newComment = CommentModel.getReplyForInterpretation(
            this.context.d2,
            this.props.interpretation
        );

        this.setState({ newComment });
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
                onClick={this.state.listIsExpanded ? this.onHideOldComments: this.onShowMoreComments}
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
                    isOwner={userCanManage(this.context.d2, comment)}
                    locale={this.context.locale}
                    onEdit={this.onEdit}
                    onReply={this.onReply}
                    onDelete={this.onOpenDeleteDialog}
                    dialogIsOpen={this.state.deleteDialogIsOpen}
                    onDeleteConfirm={this.onDeleteComment}
                    onDeleteCancel={this.onCloseDeleteDialog}
                />
            )
        );

    render() {
        const ViewMoreReplies = this.renderViewMoreLink();
        const Comments = this.renderComments();

        return (
            <div className={this.props.classes.commentSection}>
                {ViewMoreReplies}
                {Comments}
                <NewCommentField
                    comment={this.state.newComment}
                    onPost={this.onSave}
                />
            </div>
        );
    }
};

export default withStyles(styles)(CommentsList);
