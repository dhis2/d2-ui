import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n'
import orderBy from 'lodash/fp/orderBy';
import CommentText from './CommentText';
import InterpretationComment from './InterpretationComment';
import CardHeader from '../Interpretation/CardHeader';
import WithAvatar from '../Avatar/WithAvatar';

import { userCanManage } from '../../authorization/auth';
import styles from './styles/CommentList.style';

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
        this.setState({ showOnlyFirstComments: false });
    }

    onReply(comment) {
        const newComment = comment.getReply(this.context.d2);
        this.setState({ commentToEdit: null, newComment });
    }

    render() {
        const { d2 } = this.context;
        const { classes, interpretation } = this.props;
        const { commentToEdit, newComment, showOnlyFirstComments } = this.state;
        const sortedComments = orderBy(["created"], ["asc"], interpretation.comments);
        const commentsToShowOnInit = 3;
        const comments = showOnlyFirstComments ? sortedComments.slice(0, commentsToShowOnInit): sortedComments;
        const hiddenCommentsCount = showOnlyFirstComments ? sortedComments.length - comments.length : 0;

        return (
            <div className={classes.commentSection}>
                <Fragment>
                    {comments.map(comment =>
                        <WithAvatar key={comment.id} user={comment.user}>
                            <CardHeader cardInfo={comment} />
                            {commentToEdit && commentToEdit.id === comment.id
                                ?
                                    <CommentText
                                        comment={comment}
                                        onPost={this.onUpdate}
                                        onCancel={this.onCancelEdit}
                                    />
                                :
                                    <InterpretationComment
                                        comment={comment}
                                        showManageActions={userCanManage(d2, comment)}
                                        onEdit={this.onEdit}
                                        onDelete={this.onDelete}
                                        onReply={this.onReply}
                                    />
                            }
                        </WithAvatar>
                    )}

                    {showOnlyFirstComments && hiddenCommentsCount > 0 &&
                        <div className={classes.showMoreCommentSection}>
                            <Button onClick={this.onShowMoreComments} className={classes.showMoreCommentButton}>
                                <span className={classes.showMoreComments}>
                                    {hiddenCommentsCount} {i18n.t("more comments")}
                                </span>
                            </Button>
                        </div>
                    }
                </Fragment>

                {newComment &&
                    <WithAvatar user={d2.currentUser}>
                        <CommentText
                            comment={newComment}
                            onPost={this.onSave}
                            onCancel={this.onCancelNewComment}
                            isNewComment={true}
                        />
                    </WithAvatar>
                }
            </div>
        );
    }
};

export default withStyles(styles)(CommentList);
