import React from 'react';
import PropTypes from 'prop-types';
import ShowMoreButton from '../ActionButton/ShowMoreButton';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import orderBy from 'lodash/fp/orderBy';
import NewComment from './NewComment';
import OldComment from './OldComment';
import CardHeader from '../Cards/CardHeader';
import WithAvatar from '../Avatar/WithAvatar';

import { userCanManage } from '../../authorization/auth';
import styles from './styles/CommentList.style';

const commentsToShowOnInit = 3;

export class CommentList extends React.Component {
    static contextTypes = {
        d2: PropTypes.object.isRequired,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        interpretation: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        newComment: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onReply = this.onReply.bind(this);
        this.onShowMoreComments = this.onShowMoreComments.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
        this.onCancelNewComment = this.onCancelNewComment.bind(this);

        this.state = {
            commentToEdit: null,
            newComment: props.newComment,
            showOnlyFirstComments: true,
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.newComment !== newProps.newComment) {
            this.setState({ newComment: newProps.newComment });
        }
    }

    onShowMoreComments() {
        this.setState({ showOnlyFirstComments: false });
    }

    onEdit(comment) {
        this.setState({ commentToEdit: comment });
    }

    onCancelEdit() {
        this.setState({ commentToEdit: null });
    }

    onCancelNewComment() {
        this.setState({ newComment: null });
    };

    onDelete(comment) {
        if (window.confirm(i18n.t('Are you sure you want to remove this comment?'))) {
            this.props.onDelete(comment);
        }
    }

    onUpdate(comment) {
        this.props.onSave(comment);
        this.setState({ commentToEdit: null });
    }

    onSave(comment) {
        this.props.onSave(comment);
        this.setState({ showOnlyFirstComments: false, newComment: null });
    }

    onReply(comment) {
        const newComment = comment.getReply(this.context.d2);
        this.setState({ commentToEdit: null, newComment });
    }

    renderComments = () => 
        this.props.interpretation.comments.map(comment =>
            <WithAvatar key={comment.id} user={comment.user}>
                <CardHeader 
                    userName={comment.user.displayName} 
                    createdDate={comment.created} 
                />
                {this.state.commentToEdit && this.state.commentToEdit.id === comment.id ? (
                    <NewComment
                        comment={comment}
                        onPost={this.onUpdate}
                        onCancel={this.onCancelEdit}
                        isEditing={true}
                    />
                ) : (
                    <OldComment
                        comment={comment}
                        showManageActions={userCanManage(this.context.d2, comment)}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                        onReply={this.onReply}
                    />
                )}
            </WithAvatar>
        )

    render() {
        const { classes, interpretation } = this.props;
        const { newComment, showOnlyFirstComments } = this.state;

        const sortedComments = orderBy(["created"], ["asc"], interpretation.comments);
        
        const comments = showOnlyFirstComments ? sortedComments.slice(0, commentsToShowOnInit): sortedComments;
        const hiddenCommentsCount = showOnlyFirstComments ? sortedComments.length - comments.length : 0;

        const Comments = this.renderComments();

        return (
            <div className={classes.commentSection}>

                    {Comments}

                    <ShowMoreButton 
                        showButton={(showOnlyFirstComments && hiddenCommentsCount > 0)}
                        hiddenCommentsCount={hiddenCommentsCount}
                        onClick={this.onShowMoreComments}
                    />
                    {newComment && (
                        <WithAvatar user={this.context.d2.currentUser}>
                            <NewComment
                                comment={newComment}
                                onPost={this.onSave}
                                onCancel={this.onCancelNewComment}
                            />
                        </WithAvatar>
                    )}
            </div>
        );
    }
};

export default withStyles(styles)(CommentList);
